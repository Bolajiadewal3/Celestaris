# Celestaris

Website Portfolio

Three.js Portfolio Website Documentation
Project Overview
This portfolio website uses Three.js to showcase various software engineering and design projects. The website features interactive 3D elements, including a city model, dynamic overlays, and camera animations, providing a visually engaging user experience.

Features
Interactive 3D city with clickable UI panels

Smooth camera animations for transitions

Overlay panels for project details with a blurred background effect

Custom animations for 3D text banners

Responsive layout that adapts to different screen sizes

# Project Structure

### Dependencies



### Components

## ROOT.JSX

This file initializes and renders the `App` component into the DOM element with the id `root`, while logging a confirmation message. It imports necessary React and routing modules.

**Important Functions/Parameters:**

- **`createRoot()`**: Initializes a root React container for rendering components.
- **`document.getElementById("root")`**: Selects the DOM element with the id `root` where the app will be rendered.
- **`render(<App />)`**: Renders the `App` component into the selected DOM element.
- **`console.log("HAPPENED !!")`**: Logs a message indicating that the app has been rendered.

## CITY.JSX

This file renders a 3D city scene using Three.js in a React app, incorporating various interactive features like overlays, camera animations, and UI banners. It loads a city model (OBJ and MTL files), handles audio playback, and provides visual post-processing effects like bloom and depth of field.

### Important Functions/Parameters:

- **`CityModel({ onLoad })`**: Loads and displays a 3D city model using `OBJLoader` and `MTLLoader`, applying materials and scaling the model. It triggers the `onLoad` callback once the model is fully loaded.
- **`CameraLight`**: A spotlight follows the camera's position to simulate a dynamic light source in the scene. The light’s intensity, distance, and decay are adjustable.
- **`resetOrbit()`**: Resets the camera's orbit controls to the initial view after interacting with UI banners and re-enables the controls.
- **`toggleOverlay()`**: Toggles the visibility of overlays and simultaneously enables or disables the `OrbitControls` for user interaction.
- **`openOverlay(type)`**: Opens a specific overlay based on the provided content type (e.g., projects, poetry), setting the overlay’s content accordingly.
- **`startAudio()`**: Starts background audio (city ambiance) when the user first interacts with the scene.
- **`EffectComposer`**: Applies post-processing effects like `HueSaturation`, `BrightnessContrast`, `Bloom`, `DepthOfField`, and `Vignette` to the scene for enhanced visual aesthetics.

## UTILS.JSX

This file contains utility functions for commonly used operations in a Three.js React project, such as converting angles between degrees and radians.

### Important Functions/Parameters:

- **`degreesToRadians(degrees)`**: Converts an angle in degrees to its equivalent in radians. This function is essential for mathematical operations in 3D transformations.

## OVERLAYS.JSX

This file contains two components: `StartScreen` and `Overlay`. The `StartScreen` component displays an introductory screen with a fade-in effect, and the `Overlay` component renders a full-screen overlay with animated items, including a close button and an optional list of items.

### Important Functions/Parameters:

- **`StartScreen({ onStart, visible })`**: Displays an initial start screen with a button and hint text. The screen fades in based on the `visible` prop, and the `onStart` callback is triggered when the button is clicked.
- **`Overlay({ isActive, onClose, items = [] })`**: Renders a full-screen overlay with a list of items that animate into view. The visibility is controlled by the `isActive` prop, and `onClose` is triggered by the close button. Each item in the `items` array can contain a `title`, `website`, `siteLink`, and `abstract`.

## CAMERAANIMATIONS.JSX

This file defines two camera animation components for controlling the camera's movement and orientation in a 3D scene. They animate the camera's position and rotation smoothly towards target positions while optionally disabling controls during the animation.

### Important Functions/Parameters:

### `InitialCameraAnimation`

- **Props**:
  - `onComplete`: Callback function triggered when the camera finishes its movement to the target position.
- **Description**: This component animates the camera's movement to a target position and notifies the parent component once the animation is complete.

### `SmallTextCameraAnimation`

- **Props**:
  - `anchor`: Target position for the camera ([x, y, z]).
  - `lookat`: Target point for the camera to look at ([x, y, z]).
  - `onComplete`: Callback function triggered when the camera completes its movement and rotation.
  - `controlsRef`: A reference to the OrbitControls instance to disable controls during the animation.
- **Description**: This component animates the camera to a specific position and orientation while disabling the OrbitControls and notifying the parent component upon completion.

## TEXTS.JSX

This file defines two interactive 3D text banner components: `GlowingTextBanner` and `SmallTextBanner`. Both components provide animated and customizable text elements in a 3D space, with different interactivity features such as hover effects and expandable content.

### Important Functions/Parameters:

### `GlowingTextBanner`

- **Props**:
  - `text`: The text displayed on the banner.
  - `position`: The position of the banner in 3D space.
  - `rotation`: The rotation of the banner.
  - `onClick`: Callback function triggered on click.
- **Description**: Displays glowing text with a border that changes color on hover. The text is clickable and triggers the `onClick` function when clicked.

### `SmallTextBanner`

- **Props**:
  - `title`: The title text displayed on the banner.
  - `text`: The secondary text displayed on the banner.
  - `position`: The position of the banner in 3D space.
  - `rotation`: The rotation of the banner.
  - `width`: The width of the banner for text alignment.
  - `onClick`: Callback function triggered on click.
  - `isOpen`: Boolean to control if the banner is expanded.
  - `onOpen`: Callback function triggered when the banner is opened.
- **Description**: Displays an expandable 3D banner with title and content text. The banner expands when clicked and triggers animations.

Folder Structure








How It Works
3D City Model
The website renders a 3D city model using Three.js. The user can interact with the model using the mouse, and each part of the city links to a different project or content section.

UI Panels and Interactions
The UI panels slide in from the left and right when triggered by clicking on the 3D text banners.

The background is blurred to focus attention on the overlay content.

The user can close the overlay, returning to the main city view.

Camera Animations
When the page loads, an initial camera animation positions the viewer in front of the city.

Smaller animations trigger when interacting with specific text banners, smoothly guiding the user through different sections of the website.

Future Improvements
Implement dynamic loading of 3D models to optimize performance.

Add more interactivity with animated 3D objects or characters.

Optimize for mobile and tablet responsiveness.

Add a backend for project content management and dynamic portfolio updates.

Conclusion
This Three.js portfolio website integrates interactive 3D graphics with React to create an engaging and visually appealing user experience. It highlights various software engineering and design projects with dynamic animations, overlays, and smooth camera transitions.
