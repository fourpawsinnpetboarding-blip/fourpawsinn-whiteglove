# Sharp ad videos: download to the SSD

30 videos re-rendered from Rachel's originals at high quality (2026-10-04). Use these for Meta ads, not the older SSD copies.

## One-step download (Mac Terminal)

Plug in the Extreme SSD, open Terminal, paste the whole block, press Enter. It makes a folder called `creative realm videos SHARP` with 6 concept folders and 5 videos in each.

```
D="/Volumes/Extreme SSD/00_VIDEOS/creative realm videos SHARP" && mkdir -p "$D" && cd "$D" && {
mkdir -p "C1 Compare Whats Included"; curl -fL# -o "C1 Compare Whats Included/AD01-HOOK1-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/1a8ab567-d889-47a4-a2fb-d4452a37e46c.mp4
mkdir -p "C1 Compare Whats Included"; curl -fL# -o "C1 Compare Whats Included/AD01-HOOK2-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/4d46b2c7-6083-4664-98e8-05b814ad8891.mp4
mkdir -p "C1 Compare Whats Included"; curl -fL# -o "C1 Compare Whats Included/AD01-HOOK3-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/674c9cf8-b82a-4987-9663-cdd90ed94599.mp4
mkdir -p "C1 Compare Whats Included"; curl -fL# -o "C1 Compare Whats Included/AD01-HOOK4-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/c1f6acdf-2791-4871-9ff1-272d14e669a8.mp4
mkdir -p "C1 Compare Whats Included"; curl -fL# -o "C1 Compare Whats Included/AD01-HOOK5-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/b6957eec-671d-4309-99a0-b9e5c24bd9b5.mp4
mkdir -p "C2 First 24 Hours"; curl -fL# -o "C2 First 24 Hours/AD02-HOOK1-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/34d55f34-4ae4-4baf-b3ef-b6deccc31f24.mp4
mkdir -p "C2 First 24 Hours"; curl -fL# -o "C2 First 24 Hours/AD02-HOOK2-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/50ee8230-da82-4338-9d85-1d2d7c34a7d9.mp4
mkdir -p "C2 First 24 Hours"; curl -fL# -o "C2 First 24 Hours/AD02-HOOK3-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/413e4610-84f8-466b-b30a-3fa5135e0b87.mp4
mkdir -p "C2 First 24 Hours"; curl -fL# -o "C2 First 24 Hours/AD02-HOOK4-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/3d2c435d-5e48-4bbe-8b97-333fdd996fbc.mp4
mkdir -p "C2 First 24 Hours"; curl -fL# -o "C2 First 24 Hours/AD02-HOOK5-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/7fd9b422-34b9-4e53-bacc-6439b396ec5e.mp4
mkdir -p "C3 Custom Stay"; curl -fL# -o "C3 Custom Stay/AD03-HOOK1-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/4c02487b-ff94-48d8-84a5-ae194ae2616c.mp4
mkdir -p "C3 Custom Stay"; curl -fL# -o "C3 Custom Stay/AD03-HOOK2-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/6fe71057-2512-4c19-820f-727dc8003bff.mp4
mkdir -p "C3 Custom Stay"; curl -fL# -o "C3 Custom Stay/AD03-HOOK3-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/1191d757-140b-4ccf-8401-b0da8978fc9d.mp4
mkdir -p "C3 Custom Stay"; curl -fL# -o "C3 Custom Stay/AD03-HOOK4-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/63b41470-0ee0-4914-8db1-e4f826cae9d2.mp4
mkdir -p "C3 Custom Stay"; curl -fL# -o "C3 Custom Stay/AD03-HOOK5-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/fe7e0f64-33f4-418b-af4a-b5acda273586.mp4
mkdir -p "C4 Drop Off Rules"; curl -fL# -o "C4 Drop Off Rules/AD04-HOOK1-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/5caef773-1d10-4f8f-968f-964b309a2422.mp4
mkdir -p "C4 Drop Off Rules"; curl -fL# -o "C4 Drop Off Rules/AD04-HOOK2-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/0bc129e1-01c3-4fc1-b51d-4aec23b05545.mp4
mkdir -p "C4 Drop Off Rules"; curl -fL# -o "C4 Drop Off Rules/AD04-HOOK3-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/5c215e03-aee3-49ea-9ab3-7c4ad9e4c4fe.mp4
mkdir -p "C4 Drop Off Rules"; curl -fL# -o "C4 Drop Off Rules/AD04-HOOK4-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/909b7470-dc46-4497-9efd-53abbf2f3c26.mp4
mkdir -p "C4 Drop Off Rules"; curl -fL# -o "C4 Drop Off Rules/AD04-HOOK5-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/7dffb646-829b-4d06-a8f2-c26e013f3cfb.mp4
mkdir -p "C5 How To Pack"; curl -fL# -o "C5 How To Pack/AD05-HOOK1-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/214ab6ee-2b38-427d-ac60-6c499918b55e.mp4
mkdir -p "C5 How To Pack"; curl -fL# -o "C5 How To Pack/AD05-HOOK2-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/ada40fc6-5cb1-4119-a67a-ca730a46ed80.mp4
mkdir -p "C5 How To Pack"; curl -fL# -o "C5 How To Pack/AD05-HOOK3-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/eae901a7-d163-4d70-8fa6-5060d32e3697.mp4
mkdir -p "C5 How To Pack"; curl -fL# -o "C5 How To Pack/AD05-HOOK4-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/bda7cd7c-1cb0-4bc7-8b76-6e037700bfc1.mp4
mkdir -p "C5 How To Pack"; curl -fL# -o "C5 How To Pack/AD05-HOOK5-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/90da6b0c-dbaa-4176-adb8-9c59fd67e841.mp4
mkdir -p "C6 Reviews"; curl -fL# -o "C6 Reviews/AD06-HOOK1-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/84773465-6595-47ee-b2d5-05c11930874c.mp4
mkdir -p "C6 Reviews"; curl -fL# -o "C6 Reviews/AD06-HOOK2-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/2df08837-9363-41b1-95e9-8d6885692a8c.mp4
mkdir -p "C6 Reviews"; curl -fL# -o "C6 Reviews/AD06-HOOK3-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/254ebd5d-40fe-4d24-a43a-c01653153b88.mp4
mkdir -p "C6 Reviews"; curl -fL# -o "C6 Reviews/AD06-HOOK4-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/aed2272e-5c39-402f-a594-0c0e2106f07a.mp4
mkdir -p "C6 Reviews"; curl -fL# -o "C6 Reviews/AD06-HOOK5-CutA.mp4" https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/877c7738-777f-4fd9-9fbd-734ad586a46f.mp4
echo DONE; }
```

## Direct links

| Concept | Hook | Link |
| --- | --- | --- |
| C1 Compare Whats Included | 1 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/1a8ab567-d889-47a4-a2fb-d4452a37e46c.mp4 |
| C1 Compare Whats Included | 2 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/4d46b2c7-6083-4664-98e8-05b814ad8891.mp4 |
| C1 Compare Whats Included | 3 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/674c9cf8-b82a-4987-9663-cdd90ed94599.mp4 |
| C1 Compare Whats Included | 4 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/c1f6acdf-2791-4871-9ff1-272d14e669a8.mp4 |
| C1 Compare Whats Included | 5 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/b6957eec-671d-4309-99a0-b9e5c24bd9b5.mp4 |
| C2 First 24 Hours | 1 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/34d55f34-4ae4-4baf-b3ef-b6deccc31f24.mp4 |
| C2 First 24 Hours | 2 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/50ee8230-da82-4338-9d85-1d2d7c34a7d9.mp4 |
| C2 First 24 Hours | 3 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/413e4610-84f8-466b-b30a-3fa5135e0b87.mp4 |
| C2 First 24 Hours | 4 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/3d2c435d-5e48-4bbe-8b97-333fdd996fbc.mp4 |
| C2 First 24 Hours | 5 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/7fd9b422-34b9-4e53-bacc-6439b396ec5e.mp4 |
| C3 Custom Stay | 1 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/4c02487b-ff94-48d8-84a5-ae194ae2616c.mp4 |
| C3 Custom Stay | 2 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/6fe71057-2512-4c19-820f-727dc8003bff.mp4 |
| C3 Custom Stay | 3 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/1191d757-140b-4ccf-8401-b0da8978fc9d.mp4 |
| C3 Custom Stay | 4 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/63b41470-0ee0-4914-8db1-e4f826cae9d2.mp4 |
| C3 Custom Stay | 5 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/fe7e0f64-33f4-418b-af4a-b5acda273586.mp4 |
| C4 Drop Off Rules | 1 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/5caef773-1d10-4f8f-968f-964b309a2422.mp4 |
| C4 Drop Off Rules | 2 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/0bc129e1-01c3-4fc1-b51d-4aec23b05545.mp4 |
| C4 Drop Off Rules | 3 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/5c215e03-aee3-49ea-9ab3-7c4ad9e4c4fe.mp4 |
| C4 Drop Off Rules | 4 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/909b7470-dc46-4497-9efd-53abbf2f3c26.mp4 |
| C4 Drop Off Rules | 5 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/7dffb646-829b-4d06-a8f2-c26e013f3cfb.mp4 |
| C5 How To Pack | 1 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/214ab6ee-2b38-427d-ac60-6c499918b55e.mp4 |
| C5 How To Pack | 2 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/ada40fc6-5cb1-4119-a67a-ca730a46ed80.mp4 |
| C5 How To Pack | 3 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/eae901a7-d163-4d70-8fa6-5060d32e3697.mp4 |
| C5 How To Pack | 4 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/bda7cd7c-1cb0-4bc7-8b76-6e037700bfc1.mp4 |
| C5 How To Pack | 5 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/90da6b0c-dbaa-4176-adb8-9c59fd67e841.mp4 |
| C6 Reviews | 1 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/84773465-6595-47ee-b2d5-05c11930874c.mp4 |
| C6 Reviews | 2 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/2df08837-9363-41b1-95e9-8d6885692a8c.mp4 |
| C6 Reviews | 3 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/254ebd5d-40fe-4d24-a43a-c01653153b88.mp4 |
| C6 Reviews | 4 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/aed2272e-5c39-402f-a594-0c0e2106f07a.mp4 |
| C6 Reviews | 5 | https://public.eden.so/scheduling/1c2438f9-e773-4786-a8cb-121504399872/877c7738-777f-4fd9-9fbd-734ad586a46f.mp4 |
