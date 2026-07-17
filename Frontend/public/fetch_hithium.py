import urllib.request
import re
import os
import sys

# Force utf-8 encoding for stdout
sys.stdout.reconfigure(encoding='utf-8')

url = "https://hithiumbd.com/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

output_dir = r"d:\mesho solutino solar park pvt ltd\Frontend\public"
targets = [
    "hero-quality-v3.jpg", "hero-reliability-v3.jpg", "hero-technology-v3.jpg",
    "quality-cell-v3.jpg", "quality-bms-v3.jpg", "quality-thermal-v3.jpg", "quality-lab-v3.jpg",
    "reliability-uptime-v3.jpg", "reliability-weld-v3.jpg", "reliability-thermal-v3.jpg", "reliability-enclosure-v3.jpg",
    "tech-balancer-v3.jpg", "tech-comm-v3.jpg", "tech-telemetry-v3.jpg", "tech-chip-v3.jpg"
]

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'src="([^"]+\.(?:jpg|png|webp))"', html)
    bg_images = re.findall(r'url\(([^)]+\.(?:jpg|png|webp))\)', html)
    
    all_images = list(set(images + bg_images))
    
    full_images = []
    for img in all_images:
        full_img = re.sub(r'-\d+x\d+(?=\.(?:jpg|png|webp)$)', '', img)
        if full_img not in full_images and 'logo' not in full_img.lower() and 'icon' not in full_img.lower():
            full_images.append(full_img)
            
    # Download them and map to targets
    count = 0
    for i, img_url in enumerate(full_images):
        if count >= len(targets):
            break
        target_name = targets[count]
        target_path = os.path.join(output_dir, target_name)
        try:
            print(f"Downloading {img_url} to {target_name}...")
            urllib.request.urlretrieve(img_url, target_path)
            count += 1
        except Exception as e:
            print(f"Failed to download {img_url}")
            
    # Fill remaining
    while count < len(targets) and count > 0:
        target_name = targets[count]
        target_path = os.path.join(output_dir, target_name)
        src_path = os.path.join(output_dir, targets[count-1])
        with open(src_path, 'rb') as fsrc, open(target_path, 'wb') as fdst:
            fdst.write(fsrc.read())
        count += 1

except Exception as e:
    print(e)
