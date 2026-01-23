from typing import Dict, Any, List, Set, Tuple


def get_all_keys(game_data: Dict[str, Any]) -> Tuple[Set[str], List[str]]:
    tasks = set()
    errors = list()

    def walk(obj: Any):
        if not isinstance(obj, dict):
            return
        for k, v in obj.items():
            if isinstance(v, dict):
                if "completed" in v:
                    if k in tasks:
                        errors.append(f"Duplicate key '{k}' found in multiple sections")
                    tasks.add(k)
                else:
                    walk(v)

    walk(game_data)
    return tasks, errors

def get_hooked_keys(game_data: Dict[str, Any]) -> Set[str]:
    hooked: Set[str] = set()

    def walk(obj: Any):
        if not isinstance(obj, dict):
            return

        for _, v in obj.items():
            if isinstance(v, dict):
                hooks = v.get("hooks")
                if isinstance(hooks, list):
                    for h in hooks:
                        hooked.add(h)
                walk(v)

    walk(game_data)
    return hooked


def validate_game_data(game_data: Dict[str, Any]) -> List[str]:
    # ------------------------------------------------------------
    # 1) Collect keys + detect duplicates
    # ------------------------------------------------------------
    keys, errors = get_all_keys(game_data)

    # ------------------------------------------------------------
    # 2) Validate hooks in quests
    # ------------------------------------------------------------
    hooked = get_hooked_keys(game_data)
    if diff := (hooked - keys):
        for k in diff:
            if not(k.startswith("heart_piece_") or k.startswith("heart_container_") or k.startswith("magic_container_")):
                errors.append(f"Hooked key '{k}' does not exist")

    return errors


# ============================================================
# Example usage
# ============================================================

if __name__ == "__main__":
    import json
    import glob
    import os

    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    data_dir = os.path.abspath(data_dir)
    json_files = glob.glob(os.path.join(data_dir, '*.json'))

    if not json_files:
        print(f"No JSON files found in {data_dir}")
        exit(1)

    all_valid = True
    for file_path in json_files:
        print(f"\nValidating: {os.path.basename(file_path)}")
        with open(file_path, "r") as f:
            data = json.load(f)

        errs = validate_game_data(data)

        if not errs:
            print("✓ GameData is VALID!")
        else:
            all_valid = False
            print("✗ GameData has errors:")
            for e in errs:
                print(" -", e)

    if all_valid:
        print("\nAll GameData are valid!")
    else:
        print("\nSome GameData files have errors.")