import GraphicsView from '../components/GraphicsView';
import ExpoTHREE, { THREE } from 'expo-three';
import React from 'react';
import { Dimensions, Picker, PixelRatio, View } from 'react-native';

import Assets from '../Assets';

const { scaleLongestSideToSize, alignMesh } = ExpoTHREE.utils;

const onProgress = function(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};

// /// Working!
// async function loadAssimp() {
//   const res =  Assets.models.assimp.octaminator

//   const object = await ExpoTHREE.loadAsync(
//     res['Octaminator.assimp'],
//     onProgress,
//     name => res[name]
//   );
//   return object;
// }
/// Working!
// async function loadOBJMTL() {
//   const model = Assets.models.batman

//   const mesh = await ExpoTHREE.loadAsync(
//     [
//       model['B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.obj'],
//       model['B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.mtl'],
//     ],
//     () => {},
//     name => model[name]
//   );

//   mesh.traverse(async child => {
//     if (child instanceof THREE.Mesh) {
//       console.warn('child', child);

//       /// Smooth geometry
//       const tempGeo = new THREE.Geometry().fromBufferGeometry(child.geometry);
//       tempGeo.mergeVertices();
//       // after only mergeVertices my textrues were turning black so this fixed normals issues
//       tempGeo.computeVertexNormals();
//       tempGeo.computeFaceNormals();

//       child.geometry = new THREE.BufferGeometry().fromGeometry(tempGeo);

//       child.material.shading = THREE.SmoothShading;
//       child.material.side = THREE.FrontSide;

//       /// Apply other maps - maybe this is supposed to be automatic :[
//       child.material.normalMap = await ExpoTHREE.loadAsync(
//         model['B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_N.png']
//       );
//       child.material.specularMap = await ExpoTHREE.loadAsync(
//         model['B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_S.png']
//       );
//       child.material.envMap = await ExpoTHREE.loadAsync(
//         model['B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_DM_ENV.png']
//       );
//     }
//   });

//   return mesh;
// }

/// Working!
// async function loadObjImages() {
//   //https://github.com/mrdoob/three.js/blob/4e8a8c113eedc5402445de0e90cc6226c458dd01/examples/webgl_materials_channels.html
//   const obj = Assets.models.obj.ninja;

//   const SCALE = 2.436143; // from original model
//   const BIAS = -0.428408; // from original model

//   const normalMap = await ExpoTHREE.loadAsync(obj['normal.jpg']);
//   const aoMap = await ExpoTHREE.loadAsync(obj['ao.jpg']);
//   const displacementMap = await ExpoTHREE.loadAsync(obj['displacement.jpg']);

//   const object = await ExpoTHREE.loadAsync(obj['ninjaHead_Low.obj']);

//   const materialStandard = new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     metalness: 0.5,
//     roughness: 0.6,
//     displacementMap: displacementMap,
//     displacementScale: SCALE,
//     displacementBias: BIAS,
//     aoMap: aoMap,
//     normalMap: normalMap,
//     normalScale: new THREE.Vector2(1, -1),
//     //flatShading: true,
//     side: THREE.DoubleSide,
//   });

//   const materialDepthBasic = new THREE.MeshDepthMaterial({
//     depthPacking: THREE.BasicDepthPacking,
//     displacementMap: displacementMap,
//     displacementScale: SCALE,
//     displacementBias: BIAS,
//     side: THREE.DoubleSide,
//   });
//   const materialDepthRGBA = new THREE.MeshDepthMaterial({
//     depthPacking: THREE.RGBADepthPacking,
//     displacementMap: displacementMap,
//     displacementScale: SCALE,
//     displacementBias: BIAS,
//     side: THREE.DoubleSide,
//   });
//   const materialNormal = new THREE.MeshNormalMaterial({
//     displacementMap: displacementMap,
//     displacementScale: SCALE,
//     displacementBias: BIAS,
//     normalMap: normalMap,
//     normalScale: new THREE.Vector2(1, -1),
//     //flatShading: true,
//     side: THREE.DoubleSide,
//   });

//   const geometry = object.children[0].geometry;
//   geometry.attributes.uv2 = geometry.attributes.uv;
//   geometry.center();
//   const mesh = new THREE.Mesh(geometry, materialStandard);
//   mesh.scale.multiplyScalar(0.25);
//   return mesh;
// }

/// Broken - JSZip
// async function load3MF() {
//   const object = await ExpoTHREE.loadAsync(Assets.models["3mf"]["cube_gears.3mf"], onProgress);
//   return object;
// }

/// Working!
// async function loadAMF() {
//   const object = await ExpoTHREE.loadAsync(Assets.models.amf["rook.amf"], onProgress);
//   return object;
// }

/// Working!
// async function loadBabylon() {
//   // Usage:
//   // this.scene = await loadBabylon();
//   // this.camera.position.z = 100;
//   // return;

//   // Babylon files usually contain full scenes as opposed to single meshes
//   const scene = await ExpoTHREE.loadAsync(Assets.models.babylon["skull.babylon"], onProgress);

//   scene.traverse(function(object) {
//     if (object instanceof THREE.Mesh) {
//       object.material = new THREE.MeshPhongMaterial({
//         color: Math.random() * 0xffffff,
//       });
//     }
//   });

//   return scene;
// }

/// Broken - Missing `document.getElementsByTagName`
// async function loadDraco() {
//   /// https://github.com/google/draco
//   /// Draco files will return a geometry, we must add it to a mesh with a material.
//   const geometry = await ExpoTHREE.loadAsync(Assets.models.draco["bunny.drc"], onProgress);

//   geometry.computeVertexNormals();
//   const material = new THREE.MeshStandardMaterial({
//     vertexColors: THREE.VertexColors,
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   mesh.castShadow = true;
//   mesh.receiveShadow = true;

//   return mesh;
// }

/// Working!
// async function loadSTL(key = 'binary') {
//   /// This works for both `ASCII` & `Binary` `.stl` files
//   /// STL files will return a geometry, we must add it to a mesh with a material.
//   const binary = Assets.models.stl.binary["pr2_head_pan.stl"]
//   const ascii = Assets.models.stl.ascii["pr2_head_pan.stl"]
//   const models = { ascii, binary };

//   const geometry = await ExpoTHREE.loadAsync(models[key], onProgress);

//   const material = new THREE.MeshPhongMaterial({
//     color: 0xff5533,
//     specular: 0x111111,
//     shininess: 200,
//   });
//   const mesh = new THREE.Mesh(geometry, material);

//   return mesh;
// }

/// Working!
// async function loadPLY(key = 'binary') {
//   /// This works for both `ASCII` & `Binary` `.ply` files
//   /// PLY files will return a geometry, we must add it to a mesh with a material.

//   const binary = Assets.models.ply.binary["Lucy100k.ply"]
//   const ascii = Assets.models.ply.ascii["dolphins.ply"]
//   const models = { binary, ascii };
//   const geometry = await ExpoTHREE.loadAsync(models[key], onProgress);

//   geometry.computeVertexNormals();
//   const material = new THREE.MeshStandardMaterial({
//     color: 0x0055ff,
//     flatShading: true,
//   });
//   const mesh = new THREE.Mesh(geometry, material);

//   return mesh;
// }

/// Working! ASCII format is broken - it may just be the file I'm testing with (THREE.BufferGeometry.computeBoundingSphere())
// async function loadPCD(key = 'binary') {
//   /// This works for only `Binary` `.pcd` files - `ASCII` files don't work currently

//   const binary = Assets.models.pcd.binary["Zaghetto.pcd"]
//   const ascii = Assets.models.pcd.ascii["simple.pcd"]
//   const models = { binary, ascii };
//   const mesh = await ExpoTHREE.loadAsync(models[key], onProgress);

//   mesh.material.color.setHex(Math.random() * 0xffffff); // Set point color
//   mesh.material.size *= 2; // Make points bigger

//   // mesh.material.needsUpdate = true;

//   return mesh;
// }

/// Broken - `msgpack` lib is a nightmare!
async function loadMSGPack() {
  const res = Assets.models.pack["robo_pigeon.pack"]
  const scene = await ExpoTHREE.loadAsync(res, onProgress);
  return scene;
}

/// Working! binary is broken :(
// async function loadVTKorVTP(key = 'res') {
//   /// This works for `ASCII`, non compessed files, and `vtp` files
//   /// Files will returned as a geometry, we must add it to a mesh with a material.
//   /// binary is broken - ZLib

//   const res = Assets.models.vtk["bunny.vtk"]
//   const ascii = Assets.models.vtk["cube_ascii.vtp"]
//   const binary = Assets.models.vtk["cube_binary.vtp"]
//   const noncompressed = Assets.models.vtk["cube_no_compression.vtp"]

//   const models = { res, ascii, binary, noncompressed };

//   const geometry = await ExpoTHREE.loadAsync(models[key], onProgress);

//   geometry.center();
//   geometry.computeVertexNormals();
//   const material = new THREE.MeshLambertMaterial({
//     color: 0xff0000,
//     side: THREE.DoubleSide,
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   return mesh;
// }

/// Working!
// async function loadBVH() {
//   const res = Assets.models.bvh["pirouette.bvh"]
//   const { skeleton, clip } = await ExpoTHREE.loadAsync(res, onProgress);
//   return { skeleton, clip };
// }

const options = [
  // {
  //   title: 'Assimp',
  //   description: '',
  //   extensions: ['assimp', 'jpg'],
  //   onLoad: async ({ scene, camera }) => {
  //     const { object: mesh, animation } = await loadAssimp();
  //     scaleLongestSideToSize(mesh, 3);
  //     scene.add(mesh);
  //     this.animation = animation; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (animation) {
  //       animation.setTime(Date.now() / 1000);
  //     }
  //   },
  // },
  // {
  //   title: 'X',
  //   description: '',
  //   extensions: ['x', 'png'],
  //   onLoad: async ({ scene, camera }) => {
  //     const { models, skeletons, animates } = await loadX();

  //     models.map(model => scene.add(model));
  //     skeletons.map(skeleton => scene.add(skeleton));
  //     this.animates = animates;
  //     camera.position.z = -20;
  //     camera.position.y = 15;
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.animates) {
  //       for (let i = 0; i < this.animates.length; i++) {
  //         this.animates[i].update(delta * 1000);
  //       }
  //     }
  //   },
  // },

  // {
  //   title: 'Collada - Skinned',
  //   description: '',
  //   extensions: ['dae', 'jpg'],
  //   onLoad: async ({ scene }) => {
  //     const { scene: mesh, animations } = await loadRiggedDAE();
  //     scaleLongestSideToSize(mesh, 3);

  //     this.mixer = new THREE.AnimationMixer(mesh);
  //     const action = this.mixer.clipAction(animations[0]).play();
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mixer) {
  //       this.mixer.update(delta);
  //     }
  //   },
  // },
  // {
  //   title: 'Collada - Basic',
  //   description: '',
  //   extensions: ['dae', 'jpg'],
  //   onLoad: async ({ scene }) => {
  //     const { scene: mesh } = await loadBasicDAE();
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);

  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.z += 0.4 * delta;
  //   },
  // },
  // {
  //   title: '3DS',
  //   description: '',
  //   extensions: ['3ds'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await load3DS();
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);

  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'OBJ MTL N/S/D/ENV',
  //   description: '',
  //   extensions: ['obj', 'jpg', 'mtl'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadOBJMTL();
  //     scaleLongestSideToSize(mesh, 1);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);

  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'OBJ with images',
  //   description: '',
  //   extensions: ['obj', 'jpg'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadObjImages();
  //     scaleLongestSideToSize(mesh, 1);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);

  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'PCD - binary',
  //   description: '',
  //   extensions: ['pcd'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadPCD('binary');
  //     scaleLongestSideToSize(mesh, 3);

  //     mesh.rotation.x = Math.PI;
  //     mesh.rotation.y = Math.PI;

  //     alignMesh(mesh, { y: 1, x: 0, z: 0 });
  //     scene.add(mesh);

  //     this.mesh = mesh; // Save reference for rotation
  //   },
  // },
  // {
  //   title: 'AMF',
  //   description: '',
  //   extensions: ['amf'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadAMF();
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.z += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'Babylon',
  //   description: '',
  //   extensions: ['babylon'],
  //   onLoad: async scope => {
  //     scope.scene = await loadBabylon();
  //     scope.camera.position.z = 100;
  //   },
  // },
  // {
  //   title: 'STL - ascii',
  //   description: '',
  //   extensions: ['stl'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadSTL('ascii');
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'STL - binary',
  //   description: '',
  //   extensions: ['stl'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadSTL('binary');
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'PLY - ascii',
  //   description: '',
  //   extensions: ['ply'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadPLY('ascii');
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'PLY - binary',
  //   description: '',
  //   extensions: ['ply'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadPLY('binary');
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },

  // {
  //   title: 'VTP - non compessed',
  //   description: '',
  //   extensions: ['vtp'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadVTKorVTP('noncompressed');
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'VTP - ascii',
  //   description: '',
  //   extensions: ['vtp'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadVTKorVTP('ascii');
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'VTK',
  //   description: '',
  //   extensions: ['vtk'],
  //   onLoad: async ({ scene }) => {
  //     const mesh = await loadVTKorVTP();
  //     scaleLongestSideToSize(mesh, 3);
  //     alignMesh(mesh, { y: 1 });
  //     scene.add(mesh);
  //     this.mesh = mesh; // Save reference for rotation
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mesh) this.mesh.rotation.y += 0.4 * delta;
  //   },
  // },
  // {
  //   title: 'BVH',
  //   description: '',
  //   extensions: ['bvh'],
  //   onLoad: async ({ scene }) => {
  //     const { clip, skeleton } = await loadBVH();
  //     const skeletonHelper = new THREE.SkeletonHelper(skeleton.bones[0]);
  //     skeletonHelper.skeleton = skeleton; // allow animation mixer to bind to SkeletonHelper directly

  //     const boneContainer = new THREE.Group();
  //     boneContainer.add(skeleton.bones[0]);

  //     scene.add(skeletonHelper);
  //     scene.add(boneContainer);

  //     this.mixer = new THREE.AnimationMixer(skeletonHelper);
  //     this.mixer
  //       .clipAction(clip)
  //       .setEffectiveWeight(1.0)
  //       .play();
  //   },
  //   onRender: ({ delta }) => {
  //     if (this.mixer) {
  //       this.mixer.update(delta);
  //     }
  //   },
  // },
];

export default class Scene extends React.Component {
  loadingScene = false;
  state = {
    index: 0,
  };

  renderPicker = () => (
    <Picker
      selectedValue={this.state.index}
      onValueChange={(itemValue, itemIndex) => {
        if (this.state.index === itemIndex) {
          return;
        }

        this.setState({ index: itemIndex }, () => this.updateScene());
      }}
    >
      {options.map((val, index) => <Picker.Item label={val.title} key={index} value={index} />)}
    </Picker>
  );
  render() {
    return (
      <View style={{ flex: 1 }}>
        <GraphicsView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          arEnabled={false}
        />
        {this.renderPicker()}
      </View>
    );
  }

  updateScene = async () => {
    this.loadingScene = true;
    this.setupScene();
    await this.loadModelsAsync();
    this.loadingScene = false;
  };

  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      canvas,
      width,
      height,
      pixelRatio,
    });
    this.renderer.capabilities.maxVertexUniforms = 52502;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
    this.camera.position.set(0, 6, -12);
    this.camera.lookAt(0, 0, 0);
    await this.updateScene();

  };

  setupScene = () => {
    // scene
    this.scene = new THREE.Scene();

    // Standard Background
    this.scene.background = new THREE.Color(0x999999);
    this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    this.scene.add(new THREE.GridHelper(50, 50, 0xffffff, 0x555555));

    this.setupLights();
  };

  setupLights = () => {
    // lights
    const directionalLightA = new THREE.DirectionalLight(0xffffff);
    directionalLightA.position.set(1, 1, 1);
    this.scene.add(directionalLightA);

    const directionalLightB = new THREE.DirectionalLight(0xffeedd);
    directionalLightB.position.set(-1, -1, -1);
    this.scene.add(directionalLightB);

    const ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(ambientLight);
  };

  loadModelsAsync = async () => {
    this.modelInstance = options[this.state.index];
    await this.modelInstance.onLoad(this);
  };

  onResize = ({ width, height }) => {
    const scale = PixelRatio.get();

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    const { scene, renderer, mixer, camera } = this;

    if (this.modelInstance) {
      this.modelInstance.onRender &&
        this.modelInstance.onRender({ scene, renderer, mixer, camera, delta });
    }

    this.renderer.render(this.scene, this.camera);
  };
}

function splitAnimation(_baseAnime, _name, _beginTime, _endTime) {
  let animation = {};
  animation.fps = _baseAnime.fps;
  animation.name = _name;
  animation.length = _endTime - _beginTime;
  animation.hierarchy = [];
  for (let i = 0; i < _baseAnime.hierarchy.length; i++) {
    let firstKey = -1;
    let lastKey = -1;
    let frame = {};
    frame.name = _baseAnime.hierarchy[i].name;
    frame.parent = _baseAnime.hierarchy[i].parent;
    frame.keys = [];
    for (let m = 1; m < _baseAnime.hierarchy[i].keys.length; m++) {
      if (_baseAnime.hierarchy[i].keys[m].time > _beginTime) {
        if (firstKey === -1) {
          firstKey = m - 1;
          frame.keys.push(_baseAnime.hierarchy[i].keys[m - 1]);
        }
        frame.keys.push(_baseAnime.hierarchy[i].keys[m]);
      }
      if (
        _endTime <= _baseAnime.hierarchy[i].keys[m].time ||
        m >= _baseAnime.hierarchy[i].keys.length - 1
      ) {
        break;
      }
    }
    for (let m = 0; m < frame.keys.length; m++) {
      frame.keys[m].time -= _beginTime;
    }
    animation.hierarchy.push(frame);
  }
  return animation;
}
