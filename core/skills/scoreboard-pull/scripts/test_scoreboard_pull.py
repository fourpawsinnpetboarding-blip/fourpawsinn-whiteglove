#!/usr/bin/env python3

import importlib.util
import os
import sys
import unittest
from datetime import date
from pathlib import Path

MODULE_PATH = Path(__file__).with_name("scoreboard_pull.py")
SPEC = importlib.util.spec_from_file_location("scoreboard_pull", MODULE_PATH)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class ScoreboardTests(unittest.TestCase):
    def test_completed_windows(self):
        periods = MODULE.windows("America/New_York", date(2026, 9, 20))
        self.assertEqual((periods["7"].start, periods["7"].end), ("2026-09-13", "2026-09-19"))
        self.assertEqual((periods["30"].start, periods["30"].end), ("2026-08-21", "2026-09-19"))

    def test_ratio_never_invents_zero_denominator(self):
        self.assertIsNone(MODULE.safe_ratio(100, 0))
        self.assertIsNone(MODULE.safe_ratio(None, 5))
        self.assertEqual(MODULE.safe_ratio(100, 4), 25)

    def test_meta_action_classification(self):
        row = {"actions": [{"action_type": "lead", "value": "4"}, {"action_type": "purchase", "value": "2"}]}
        self.assertEqual(MODULE.meta_action_total(row, {"lead"}), 4)
        self.assertEqual(MODULE.meta_action_total(row, {"purchase"}), 2)

    def test_missing_values_render_unavailable(self):
        self.assertEqual(MODULE.money(None), "Unavailable")
        self.assertEqual(MODULE.number(None), "Unavailable")

    def test_combined_cac_requires_verified_customer_count(self):
        periods = MODULE.windows("America/New_York", date(2026, 9, 20))
        sources = {
            "meta_ads": {"status": "ok", "windows": {"7": {"spend": 70, "leads": 7}, "30": {"spend": 300, "leads": 30}}},
            "google_ads": {"status": "unavailable"},
        }
        old_7 = os.environ.pop("SCOREBOARD_CUSTOMERS_7D", None)
        old_30 = os.environ.pop("SCOREBOARD_CUSTOMERS_30D", None)
        try:
            combined = MODULE.combined_paid(sources, periods)
        finally:
            if old_7 is not None:
                os.environ["SCOREBOARD_CUSTOMERS_7D"] = old_7
            if old_30 is not None:
                os.environ["SCOREBOARD_CUSTOMERS_30D"] = old_30
        self.assertEqual(combined["7"]["cpl"], 10)
        self.assertIsNone(combined["7"]["cac"])

    def test_collector_contains_no_google_ads_mutation_endpoint(self):
        source = MODULE_PATH.read_text(encoding="utf-8").lower()
        self.assertNotIn(":mutate", source)
        self.assertNotIn("mutatecampaign", source)


if __name__ == "__main__":
    unittest.main()
