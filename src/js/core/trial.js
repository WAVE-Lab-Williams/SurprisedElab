/*
===============================================================
PUSHING/RUNNING A CUSTOM SINGLE TRIAL (*singleTrial)
===============================================================
*/
function runSingleTrial(
    personRace,
    personSex,
    personVariation,
    dispDuration,
    timelineTrialsToPush,
    trialType,
) {

    /*--------------------------- General Utility ---------------------------*/
    var checkScreen = {
        type: jsPsychFullscreen,
        message:
            '<p>Unfortunately, it appears you are no longer in fullscreen mode. Please make sure to remain in fullscreen mode. <br>Click on the button to fullscreen the experiment again and proceed.</p>',
        fullscreen_mode: true,
        button_label: 'Resume',
    };

    var if_notFull = {
        timeline: [checkScreen],
        conditional_function: function () {
            if (full_check == false) {
                return true;
            } else {
                return false;
            }
        },
    };

    var cursor_off = {
        type: jsPsychCallFunction,
        func: function () {
            document.body.style.cursor = 'none';
        },
    };

    var cursor_on = {
        type: jsPsychCallFunction,
        func: function () {
            document.body.style.cursor = 'auto';
        },
    };

    /*--------------------------- Experiment specific variables ---------------------------*/
    var thisStim = `${stimFolder}${personRace}${personSex}-${personVariation}.png`
    var persistent_prompt = `<div style="position: fixed; top: 50px; left: 50%; transform: translateX(-50%); text-align: center;">Drag the slider to recreate the exact size of the image you just saw</div>`;



    /* testing a slider */
    let tar_size = randomIntFromRange(50, 90);
    let target_resizing_decimal = tar_size*.01;
    let target_width = Math.floor(imgWidth * target_resizing_decimal);
    let target_height = Math.floor(imgHeight * target_resizing_decimal);
    let target_x_random = randomIntFromRange(0, w-target_width); // accounts for img dims to not go off screen
    let target_y_random = randomIntFromRange(0, h-target_height);

    console.log(w)
    console.log(`Where the left of the image will be positioned target_x_random: ${target_x_random}`)
    console.log(`target_width: ${target_width}`)
    console.log(h)
    console.log(`Where the top of the image will be positioned target_y_random: ${target_y_random}`)
    console.log(`target_height: ${target_height}`)

    var slider_start = 70;
    var min = 20;
    var max = 120;

    var dispImgSlider = {
        type: jsPsychHtmlSliderResponseResizing,
        stimulus: `<img src="${thisStim}" />`,
        slider_start: slider_start,
        min: min,
        max: max,
        slider_width: 500,
        labels: ["smallest","largest"],
        trial_duration: null,
        response_ends_trial: true,
        prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'answer'+trialType,
            trial_stimulus: thisStim,
            correct_response: tar_size,
            slider_start: slider_start,
            min: min,
            max: max,
        }, // data end
        on_finish: function(data){
            data.thisDifference = data.response - tar_size
        } // on finish end
    }; // dispCircle end

    var dispImg = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="position: absolute; top: ${target_y_random}px; right: ${target_x_random}px;">`+
            `<img src="${thisStim}" style="width:${target_width}px;" />` + 
            `</div>`,
        choices: "NO_KEYS",
        trial_duration: dispDuration,
        // prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'dispImg'+trialType,
            // trial_stimulus: thisStim,
            // trial_duration: dispDuration,
            // target_width: target_width,
            // target_height: target_height,
        }, // data end
    }; // dispImg end

    var prestim = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `${persistent_prompt}`,
        choices: "NO_KEYS",
        trial_duration: PRESTIM_DISP_TIME,
        data: {
            trial_category: 'prestim_ISI' + trialType,
        }
    };

    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `${persistent_prompt}<div style="font-size:60px;">+</div>`,
        choices: "NO_KEYS",
        trial_duration: FIXATION_DISP_TIME,
        data: {
            trial_category: 'fixation' + trialType,
        }
    };


    /*--------------------------- push single trial sequence ---------------------------*/

    timelineTrialsToPush.push(if_notFull);
    timelineTrialsToPush.push(cursor_off);
    timelineTrialsToPush.push(prestim);
    timelineTrialsToPush.push(fixation);
    timelineTrialsToPush.push(dispImg);
    timelineTrialsToPush.push(prestim);
    timelineTrialsToPush.push(cursor_on);
    timelineTrialsToPush.push(dispImgSlider);


}

// make a poststim, set in parameters the length of time to be 500 ms.