"""
true_trial_count.py

Reads all dataframe_answer_* files under tools/data/ and adds/overwrites
a 'true_trial_count' column: a counter starting at 1 that increments for
each row and resets when a new participant_id is encountered.

Files are processed in-place (overwritten).
"""

import glob
import os
import pandas as pd


DATA_DIR = os.path.join(os.path.dirname(__file__), "data")


def add_true_trial_count(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    if ext == ".csv":
        df = pd.read_csv(filepath)
    else:
        print(f"  Skipping unsupported format: {filepath}")
        return

    df["true_trial_count"] = (
        df.groupby("participant_id").cumcount() + 1
    )

    if ext == ".csv":
        df.to_csv(filepath, index=False)
    else:
        df.to_excel(filepath, index=False)

    print(f"  Updated: {filepath}")


def main():
    pattern = os.path.join(DATA_DIR, "**", "dataframe_answer_*")
    files = glob.glob(pattern, recursive=True)

    if not files:
        print(f"No dataframe_answer_* files found under {DATA_DIR}")
        return

    print(f"Found {len(files)} file(s):\n")
    for filepath in sorted(files):
        add_true_trial_count(filepath)

    print("\nDone.")


if __name__ == "__main__":
    main()
