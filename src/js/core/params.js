/*
===============================================================
Defining Parameter Variables
===============================================================
*/

var stimFolder = 'src/assets/stimuli/people_samebody_cropped/'

var runIntro = false;
var runInstr = true;
var runExpt = true;
var runClose = true;
var runPreload = true;

// for reproduce rectangle version
var rectangleVer = false;

// Defining Core Variables that remain constant
var PRESTIM_DISP_TIME = 700;
var FIXATION_DISP_TIME = 500;
var POSTSTIM_DISP_TIME = 500;

// Variables for Participant Information
var estTotalRunTime = 6;
var estDollars = 0.90;
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
var origWidth = 164;
var origHeight = 545;
var imgWidth = 150; // your desired display img width
var imgHeight = (imgWidth / origWidth) * origHeight;


