# Colors App

- Similar to sites like [Material UI Colors](http://materialuicolors.co/?utm_source=launchers)

## Project Todo List:

- [x] Start project
- [x] Create Palette Component
  - [x] Top Bar - Navigation Bar
    - [x] Select DropDown (Material UI)
  - [x] ColorBox - boxes of each color
  - [x] Footer - name of Palette
- [x] ColorBox Component
- [x] Clipboard React Library - clips hex color of ColorBox
- [x] Animation overlay
- [x] Generate color shades
  - [x] generatePalette helper function
- [x] Add color slide to Palette - Slider
- [x] Palette List - seedColors palettes prop
  - [x] renders miniPalettes - click on to go to specific palette
  - [x] Minipalettes display palette info and create div box for each color
- [x] BrowserRouter, Route on App.js to link to Palette List and each Palette
- [x] Add link to More button on Palette colorBox
- [x] Create Single Color palette component - color with 10 shades
  - [x] Navbar for single palette
  - [x] Footer for single palette
  - [x] Go back button to go back to Palette
  - [x] Style single color palette boxes (inherits from Palette and ColorBox css)
  - [x] Change text color based on color luminance (chromaJS)
- [x] Palette Form
  - [x] Link to New Palette From on PaletteList component
  - [x] Slide out drawer - Material UI persistant drawer
  - [x] Color picker component - Chrome Picker
  - [x] Connect add color button to chromepicker
  - [x] Creat Draggable Color box component
  - [x] Form Input Validator - validate color and color name
- [ ] Saving new palettes
  - [x] Add save palette button and save new palette
  - [x] Save palette to palette list, redirect to Palette page

## Libraries:

- [Create React App](<(https://github.com/facebook/create-react-app)>)
- [React](https://reactjs.org)
- [React Router](https://www.npmjs.com/package/react-router-dom)
- [Material UI](https://mui.com/)
- [Chroma JS](https://gka.github.io/chroma.js/)
- [rc-slider](https://www.npmjs.com/package/rc-slider)
- [React Color](https://casesandberg.github.io/react-color/#about)
- [Form Validator](https://www.npmjs.com/package/react-material-ui-form-validator)

## 🎨 About

This is a project I worked on while learning [React](https://reactjs.org). This is a clone of websites like Flat UI Colors and Material UI Colors.

I learned a lot while coding this project. I ended up using React Hooks and not class components. Still need to refractor the CSS to use JSS to clean up the code. I also learned how to deal with Draggable boxes and how to properly move them.

[Material UI] was used for Icons. ChromaJS was used to get the scale for each color box and to retrieve the Luminance to make the text more visible on each box. Emoji Picker was used so the user can select an emoji when they are creating their own Color Palette.

## 🖥 Use

### Locally

- clone the project
- go to project folder `cd color-app-react`
- download the dependences `npm install`
- start the application `npm start` - runs app in development mode
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Pages
