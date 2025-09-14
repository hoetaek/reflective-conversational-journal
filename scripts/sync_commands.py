#!/usr/bin/env python3
"""
Sync commands from .claude/commands/*.md to .gemini/commands/*.toml
"""
from pathlib import Path


def extract_description_and_content(md_file_path):
    """Extract description and main content from a markdown file"""
    with open(md_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')

    # Find description (usually in **설명**: format or after first heading)
    description = ""
    for i, line in enumerate(lines):
        if '**설명**:' in line:
            description = line.split('**설명**:', 1)[1].strip()
            break
        elif line.startswith('# ') and i + 2 < len(lines):
            # Check if next non-empty line might be description
            next_line = lines[i + 2].strip() if lines[i + 1].strip() == '' else lines[i + 1].strip()
            if next_line and not next_line.startswith('#') and not next_line.startswith('**'):
                description = next_line
                break

    if not description:
        # Fallback: use the first non-heading, non-empty line
        for line in lines:
            if line.strip() and not line.startswith('#') and not line.startswith('**'):
                description = line.strip()
                break

    # Extract main content (everything)
    main_content = content

    return description, main_content


def escape_toml_string(content):
    """Escape content for TOML triple-quoted string"""
    # Replace triple quotes to avoid breaking TOML format
    content = content.replace('"""', '\\"\\"\\"')
    return content


def convert_md_to_toml(md_file_path, toml_file_path):
    """Convert a markdown command file to TOML format"""
    description, content = extract_description_and_content(md_file_path)

    # Escape content for TOML
    escaped_content = escape_toml_string(content)

    # Create TOML content
    toml_content = f'description = "{description}"\n\nprompt = """\n{escaped_content}\n"""\n'

    # Write to TOML file
    toml_file_path.parent.mkdir(parents=True, exist_ok=True)
    with open(toml_file_path, 'w', encoding='utf-8') as f:
        f.write(toml_content)

    print(f"Converted {md_file_path.name} -> {toml_file_path.name}")


def sync_commands():
    """Sync all commands from .claude to .gemini"""
    claude_dir = Path('.claude/commands')
    gemini_dir = Path('.gemini/commands')

    if not claude_dir.exists():
        print("No .claude/commands directory found")
        return

    # Clean up existing .toml files in gemini_dir
    if gemini_dir.exists():
        for toml_file in gemini_dir.glob('*.toml'):
            toml_file.unlink()
            print(f"Removed {toml_file.name}")

    # Process all .md files in claude_dir
    for md_file in claude_dir.glob('*.md'):
        # Create corresponding .toml filename
        toml_filename = md_file.stem + '.toml'
        toml_file = gemini_dir / toml_filename

        # Convert and sync
        convert_md_to_toml(md_file, toml_file)


if __name__ == '__main__':
    sync_commands()
