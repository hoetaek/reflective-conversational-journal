# GEMINI.md: Reflective Journal Companion

## Directory Overview

This directory contains the "Reflective Journal Companion," an AI-powered, file-based journaling system. Its purpose is to help you turn daily experiences into meaningful insights for personal growth. The system is built around a series of Gemini commands that guide you through structured reflection, analyze your entries for patterns, and help you generate weekly summaries.

The core philosophy is based on the "What -> So What -> Now What" framework, encouraging a deep dive into individual experiences rather than just surface-level recording. All journal entries are stored as local Markdown files, ensuring you always own your data.

## Key Files & Commands

The project is organized into three main parts: templates for structuring your notes, commands for interacting with the AI, and the journal directory where your entries are saved.

### 1. `templates/`
This directory holds the Markdown templates that form the basis of your journal entries. They use placeholders like `[SLOT_NAME]` which are filled in by the AI during the journaling process.
- `about-me-template.md`: Used by the `/setup` command to create a personal context file for the AI.
- `daily-note-template`: The structure for your daily journal entries, focusing on individual experiences and insights.
- `weekly-note-template.md`: The template for the weekly review, summarizing patterns, achievements, and lessons learned.

### 2. `.gemini/commands/`
This is the heart of the system, containing the logic for the AI's behavior. Each `.toml` file defines a command that you can run.
- `setup.toml` (`/setup`): Initiates a conversation to understand your personal context, values, and reflection patterns. It saves this information in `about-me.md` to help the AI ask better, more personalized questions in the future.
- `journal.toml` (`/journal`): Starts the daily journaling process. The AI will chat with you about your day, guide you through reflecting on specific events using the "What-So What-Now What" model, and save the output to a new file in `journal/daily/`.
- `weekly.toml` (`/weekly`): At the end of the week, this command reads all your daily entries, analyzes them for recurring themes and patterns, and generates a draft weekly review for you to edit and finalize. The output is saved in `journal/weekly/`.

### 3. `journal/`
This directory is where all your generated journal entries are stored. It is created automatically.
- `daily/`: Contains your daily reflections, with one file per day.
- `weekly/`: Contains your weekly reviews.

## Usage / Workflow

Here is the intended workflow for using the Reflective Journal Companion:

1.  **Initial Setup (Once):** Run the `/setup` command. This is a one-time process where the AI asks you a series of questions to build a profile of your goals and values, which it uses to personalize future interactions.
2.  **Daily Reflection:** Use the `/journal` command each day to reflect on your experiences. The AI will guide the conversation.
3.  **Weekly Review:** At the end of the week, use the `/weekly` command to get a summary of your week, identify patterns, and set intentions for the week ahead.
