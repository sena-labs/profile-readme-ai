# Creating the Demo GIF

## Option 1: Using asciinema + svg-term-cli (Recommended)

```bash
# Install tools
npm install -g svg-term-cli
# or use asciinema.org for recording

# Record a demo session
asciinema rec demo.cast

# In the recording, run:
npx profile-readme-ai generate -u octocat -t neon --dry-run

# Convert to GIF
svg-term --in demo.cast --out demo.gif --window
```

## Option 2: Using terminalizer

```bash
npm install -g terminalizer

# Record
terminalizer record demo

# Edit config if needed
terminalizer render demo -o demo.gif
```

## Option 3: Using VHS (charm.sh)

```bash
# Install VHS: https://github.com/charmbracelet/vhs

# Create a tape file (demo.tape):
Output demo.gif
Set FontSize 14
Set Width 800
Set Height 400

Type "npx profile-readme-ai generate -u octocat -t neon --dry-run"
Enter
Sleep 5s

# Run
vhs demo.tape
```

## Recommended Demo Flow

1. Show the command being typed
2. Show the spinner/progress
3. Show the generated README preview
4. Duration: 10-15 seconds
5. Resolution: 800x400 or 1000x500
