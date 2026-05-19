"""
Fix: Move infographic image section from how-to-sign-up article (line 312)
to the correct location in medicare-at-65-month-by-month-timeline article (after line 92).
"""

with open('src/lib/blog-articles-data.ts', 'r') as f:
    lines = f.readlines()

# The image section line (0-indexed: 311 = line 312)
image_line = lines[311]
assert 'type: "image"' in image_line, f"Expected image section at line 312, got: {image_line[:80]}"
assert 'infographic-part-b-penalty-v2' in image_line, "Expected infographic URL in image section"

# The insertion point: after line 92 (0-indexed: 91), before line 93 (0-indexed: 92)
insert_after_idx = 91  # 0-indexed line 92
assert '8-month Special Enrollment Period' in lines[insert_after_idx], \
    f"Expected SEP paragraph at line 92, got: {lines[insert_after_idx][:80]}"

# Step 1: Remove the image section from line 312 (0-indexed: 311)
del lines[311]

# Step 2: Insert the image section after line 92 (0-indexed: 91)
# After deletion, line 92 is still at index 91 (deletion was at 311, far after 91)
lines.insert(insert_after_idx + 1, image_line)

# Write back
with open('src/lib/blog-articles-data.ts', 'w') as f:
    f.writelines(lines)

print("Done! Image section moved from line 312 to after line 92.")
print(f"Inserted: {image_line[:100]}")
