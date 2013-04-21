/*  @author : Dave Lamarre */


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, scene, renderer, objects;
var particleLight, pointLight;
var dae, skin;
var rotation= 0;


$(document).ready(function(){

    var clock = new THREE.Clock();
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load( 'models/cube.dae', function ( collada ) {

        dae = collada.scene;
        skin = collada.skins[ 0 ];

        dae.scale.x = dae.scale.y = dae.scale.z = 1;
        //dae.position.x = -1;
        dae.updateMatrix();

        init();
        animate();

    } );

    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.set( 2, 4, 5 );

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.035 );

        // load le collada
        scene.add( dae );

        // ajuste la lumiere

        scene.add( new THREE.AmbientLight( 0xcccccc ) );

        pointLight = new THREE.PointLight( 0xff4400, 5, 30 );
        pointLight.position.set( 5, 0, 0 );
        scene.add( pointLight );

        // web gl renderer

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        container.appendChild( renderer.domElement );


        $(window).resize(function(event){
            console.log("Resizing window..")
            renderer.setSize( window.innerWidth, window.innerHeight );

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();



        });

    }





    var t = 0;
    function animate() {

        requestAnimationFrame( animate );

        // animate Collada model

        if ( t > 30 ) t = 0;

        if ( skin ) {

            for ( var i = 0; i < skin.morphTargetInfluences.length; i++ ) {
                skin.morphTargetInfluences[ i ] = 0;
            }
            skin.morphTargetInfluences[ Math.floor( t ) ] = 1;
            t += 0.5;
        }

        // animate morphs
        var delta = clock.getDelta();

        render();
    }

    function render() {

        var timer = Date.now() * 0.0005;

        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = -10;

        camera.lookAt( scene.position );
        renderer.render( scene, camera );
    }

});
