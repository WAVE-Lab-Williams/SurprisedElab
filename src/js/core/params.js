/*
===============================================================
Defining Parameter Variables
===============================================================
*/

var stimFolder = 'src/assets/stimuli/people/'

var runIntro = false;
var runInstr = false;
var runExpt = true;
var runClose = true;
var runPreload = true;

// Defining Core Variables that remain constant
var PRESTIM_DISP_TIME = 1000;
var FIXATION_DISP_TIME = 500;
var POSTSTIM_DISP_TIME = 500;

// Variables for Participant Information
var estTotalRunTime = 4;
var estDollars = 0.6;
var participantType = 'prolific';
var completionCode = 'C4MF2IV1';
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
var origWidth = 250;
var origHeight = 545;
var imgWidth = origWidth; // your desired display img width
var imgHeight = (imgWidth / origWidth) * origHeight;


