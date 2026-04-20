from PIL import Image
import os

src = "c:/Users/inkpe/local-JS-Williams/SurprisedElab/src/assets/stimuli/people_samebody_shadow/uncropped"
dst = "c:/Users/inkpe/local-JS-Williams/SurprisedElab/src/assets/stimuli/people_samebody_shadow"
os.makedirs(dst, exist_ok=True)

files = [f for f in os.listdir(src) if f.endswith('.png')]
for fname in files:
    img = Image.open(os.path.join(src, fname))
    w, h = img.size
    cropped = img.crop((49, 0, w - 39, h))  # left=49, top=0, right=w-39, bottom=h
    assert cropped.size == (164, 545), f"{fname}: unexpected size {cropped.size}"
    cropped.save(os.path.join(dst, fname), format='PNG')
    print(f"{fname}: {img.size} -> {cropped.size}")

print(f"\nDone. {len(files)} images saved to {dst}")