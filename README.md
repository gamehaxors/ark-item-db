# ark-game-db
An SPA for getting cheat codes for Ark: Survival Evolved on your clipboard nice and fast.

[View it Here](http://gamehaxors.github.io/ark-item-db/#/)

## About
Quickly search for items in Ark: Survival Evolved and with the click of a button get the cheat code on your clipboard.

### Features
- Ultra fast search
- Adjust quantity of items before copying.
- Adjusted quantities saved to local storage in your browser.
- One-click gets you the whole cheat code.

## TODO
- Add ability to choose item quality.
- Add button to just get the code for a single blueprint (using quality from ^.)
- Add ability to select multiple items
- Add "With Selection" dropdown with options to:
  - Create Group
  - Add to Group
- Add ability to view groups, and copy the cheats for all items in group to clipboard. (eg, "Broodmother Artificats")

## Contribute
Fork this repo, make changes in your fork, submit a pull request!  Items are located in: 
`/src/js/pages/dashboard/arkItems.js`

### Notes for Modders or other Haxors working on adding mod items
I'm not quite ready to accept PRs yet, but you can get ready:

- create a `mods` folder @ `src/js/pages/dashboard/`
- create a folder inside that with your mod name, in a folder-friendly format, all lowercase please. Use dashes for 
spaces, not underscores please. =)
- create an `index.js` file with `module.exports` getting an array of your items. Follow the format you can see in
`src/js/pages/dashboard/arkItems.js`
- you should NEVER use an item number for your item ids.  Use the full asset path!
- create an `about.json` file in your mod folder, have it look like this:

```
{
    "name": "Human Friendly Mod Name =)",
    "version": "1.1.1",
    "author": "Your Name",
    "description": "About your mod, no HTML.",
    "homepage": "http://www.yourmodshomepage.com"
}
```

only `name` and `version` are required.


## Inspired By
http://playjurassicark.com/ark-item-id-list-for-administrators/
