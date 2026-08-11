/*
===============================================================
Defining Parameter Variables
===============================================================
*/

var stimFolder = 'src/assets/stimuli/animals/'

var runIntro = false;
var runInstr = false;
var runExpt = true;
var runClose = true;
var runPreload = true;

// for reproduce ambiguous silhouette version
var silhouetteResponseVer = false;

// Defining Core Variables that remain constant
var PRESTIM_DISP_TIME = 700;
var FIXATION_DISP_TIME = 500;
var POSTSTIM_DISP_TIME = 500;
var PERSON_DISP_TIME = 300;

// Variables for Participant Information
var estTotalRunTime = 8;
var estDollars = 1.2;


var participantType = 'prolific';
var completionCode = 'CN955H3L';
var prolific_url = 'https://app.prolific.co/submissions/complete?cc='+completionCode;

// WAVE Backend Configuration
var waveBackendUrl = 'https://wave-backend-production-8781.up.railway.app';
// var waveBackendUrl = 'http://localhost:8000';  // For local development

// initializing variables
var timelinebase = [];
var timelineintro = [];
var timelineinstr = [];
var timelineexpt = [];
var timelineclose = [];
var forPreload = [];
var full_check = false;
var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

// setting display image width
var origWidth = 835;
var origHeight = 900;
var imgWidth = 500; // your desired display img width
var imgHeight = (imgWidth / origWidth) * origHeight;

// define object stim size, should be 164 x 545px
// it is okay for objectWidth and imgWidth to be vastly different
// but it is NOT okay for objHeight and imgHeight to be vastly different
// because dispSlider lines them up based on the top of the images, so alignment could look jank
// especially if you want them both to look like they're sitting on the ground.
var objectWidth = 164; 
var objectHeight = 545; 

// Largest edge-to-edge gap (px) that will ever be shown, INCLUDING the +/-20 jitter applied in
// timeline.js. Used to size the slider-reproduction stage in trial.js. Update this if you add a
// bigger poss_obj_distance/demo_obj_distance value or change the jitter range.
var maxPossibleGap = 260;

// Smallest browser window the anchor+object images can be laid out in without going off screen
// (mirrors the 50px margins used by anchor_x_random/anchor_y_random in trial.js). Participants
// with a smaller window are blocked at the start of the study (see timeline.js).
var minRequiredWidth = imgWidth + objectWidth + maxPossibleGap + 100;
var minRequiredHeight = Math.max(imgHeight, objectHeight) + 100;





