# 🚀 Push to GitHub Commands

## After creating your PUBLIC repository on GitHub, run these:

```bash
cd "/Users/watson/EL DAY"

# Add GitHub as remote (replace YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/ellie-adventure.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## If it asks for credentials:
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password!)

## Need a token?
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "EL DAY"
4. Check: "repo" scope
5. Click "Generate token"
6. Copy the token and use it as your password

---

## After pushing successfully:

### Enable GitHub Pages:
1. Go to your repo on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar, under "Code and automation")
4. Under "Branch", select: **main**
5. Click **Save**
6. Wait 1-2 minutes

### Your site will be live at:
`https://YOUR_USERNAME.github.io/ellie-adventure/`

🎉 Send that link to Ellie!

