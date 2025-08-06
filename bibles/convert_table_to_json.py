#!/usr/bin/env python3

import json
import sys
from typing import List, Dict, Any

def convert_value(value: str) -> Any:
    """Convert string values to appropriate types."""
    # Convert boolean strings
    if value.upper() == 'TRUE':
        return True
    if value.upper() == 'FALSE':
        return False
    
    # Try converting to integer
    try:
        return int(value)
    except ValueError:
        pass
    
    # Return as string if no other conversion applies
    return value

def parse_tsv(lines: List[str]) -> List[Dict[str, Any]]:
    """Parse TSV content into a list of dictionaries."""
    if not lines:
        return []
    
    # Split header line and clean column names
    headers = lines[0].strip().split('\t')
    
    # Process each data line
    result = []
    for line in lines[1:]:
        if not line.strip():  # Skip empty lines
            continue
            
        values = line.strip().split('\t')
        item = {}
        
        # Map each value to its header
        for header, value in zip(headers, values):
            # Special handling for the ID field
            if header == 'bible_version_id':
                item['id'] = convert_value(value)
            else:
                item[header] = convert_value(value)
        
        result.append(item)
    
    return result

def main():
    # Read from stdin if no file is specified
    if len(sys.argv) < 2:
        print("Reading from stdin (paste your table and press Ctrl+D when done)...")
        lines = sys.stdin.readlines()
    else:
        # Read from file if specified
        with open(sys.argv[1], 'r') as f:
            lines = f.readlines()
    
    # Convert to JSON structure
    bible_versions = parse_tsv(lines)
    
    # Create the final JSON structure
    json_data = {
        "bible_versions": bible_versions
    }
    
    # Output the JSON with proper formatting
    print(json.dumps(json_data, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    main() 