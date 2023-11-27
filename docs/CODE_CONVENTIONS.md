# Code Conventions

## Case

snake_case: functions, variables, filenames <br>
PascalCase: classes, types, interfaces <br>
SCREAMING_SNAKE_CASE: markdown filenames <br>
Sentence case: comments <br>
Others: when appropriate (e.g., title case in titles) <br>

## Formatting

Use Prettier with the provided prettierrc.

## Language

Everything should be in English. This includes code, comments, documentation, etc.

## Misc

Don't use the type 'any' unless absolutely necessary.

Avoid abbreviations and acronyms that aren't generally accepted in plain English. (e.g., API (Application Programming Interface): okay, attr (attribute): not okay). <br>
Exceptions can be made if the name in question is ridiculously long. If so, clarify with an accompanying comment at the definition.

Don't create monolith files. Files should only contain code that belongs together. <br>
Only add up to one class in each file, with the optional exception if a secondary class is only used within the primary class of that file.
