# VHS Demo Recording for profile-readme-ai
Output assets/demo.gif

Set Shell "pwsh"
Set FontSize 16
Set Width 900
Set Height 500
Set Theme "Dracula"
Set Padding 20
Set Framerate 30

# Start with clear screen
Hide
Type "clear"
Enter
Sleep 500ms
Show

# Show the command
Type "npx profile-readme-ai generate -u octocat -t neon --dry-run"
Sleep 500ms
Enter

# Wait for execution
Sleep 8s

# Pause at the end to show result
Sleep 3s
