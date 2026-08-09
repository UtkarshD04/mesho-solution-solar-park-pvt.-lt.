import urllib.request
import os

output_dir = r"d:\mesho solutino solar park pvt ltd\Frontend\public"
downloads = {
    "hero-reliability-v5.png": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
    "reliability-uptime-v5.png": "https://images.unsplash.com/photo-1620714223084-8fcacc2523b0?w=1200&q=80",
    "reliability-weld-v5.png": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80",
    "reliability-thermal-v5.png": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
    "reliability-enclosure-v5.png": "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=1200&q=80",
    "hero-technology-v5.png": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    "tech-balancer-v5.png": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    "tech-comm-v5.png": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    "tech-telemetry-v5.png": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "tech-chip-v5.png": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
}

for filename, url in downloads.items():
    path = os.path.join(output_dir, filename)
    try:
        print(f"Downloading {url} to {filename}...")
        urllib.request.urlretrieve(url, path)
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
