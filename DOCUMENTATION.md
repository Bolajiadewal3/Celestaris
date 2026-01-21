## Modules

<dl>
<dt><a href="#module_City">City</a></dt>
<dd><p>City scene component and model loaders.</p>
</dd>
<dt><a href="#module_Portfolio">Portfolio</a></dt>
<dd><p>Main Portfolio experience and computer setup.</p>
</dd>
</dl>

<a name="module_City"></a>

## City

City scene component and model loaders.

- [City](#module_City)
  - [module.exports()](#exp_module_City--module.exports) ⇒ <code>JSX.Element</code> ⏏
    - [~CityModel(props)](#module_City--module.exports..CityModel) ⇒ <code>JSX.Element</code>
    - [~CameraLight()](#module_City--module.exports..CameraLight) ⇒ <code>JSX.Element</code>

<a name="exp_module_City--module.exports"></a>

### module.exports() ⇒ <code>JSX.Element</code> ⏏

Main application component rendering a Three.js city scene,
interactive UI overlays, banners, and ambient experience.

**Kind**: Exported function  
**Component**:  
<a name="module_City--module.exports..CityModel"></a>

#### module.exports~CityModel(props) ⇒ <code>JSX.Element</code>

CityModel loads a textured 3D city model (OBJ + MTL) and adds it to the scene.
It also calls `onLoad` once the model is fully loaded.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_City--module.exports)  
**Returns**: <code>JSX.Element</code> - - A group element containing the loaded 3D city model  
**Component**:

| Param        | Type                  | Description                                               |
| ------------ | --------------------- | --------------------------------------------------------- |
| props        | <code>Object</code>   | Component props                                           |
| props.onLoad | <code>function</code> | Callback triggered after the model is successfully loaded |

<a name="module_City--module.exports..CameraLight"></a>

#### module.exports~CameraLight() ⇒ <code>JSX.Element</code>

CameraLight attaches a spotlight that follows the camera's position,
simulating a light source that moves with the viewer.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_City--module.exports)  
**Returns**: <code>JSX.Element</code> - - A spotlight that follows the camera  
**Component**:  
<a name="module_Portfolio"></a>

## Portfolio

Main Portfolio experience and computer setup.

<a name="exp_module_Portfolio--module.exports"></a>

### module.exports() ⇒ <code>JSX.Element</code> ⏏

Main application component rendering a Three.js city scene,
interactive UI overlays, banners, and ambient experience.

**Kind**: Exported function  
**Component**:
