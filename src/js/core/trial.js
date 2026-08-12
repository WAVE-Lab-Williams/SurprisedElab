/*
===============================================================
PUSHING/RUNNING A CUSTOM SINGLE TRIAL (*singleTrial)
===============================================================
*/
function runSingleTrial(
    personRace,
    personSex,
    personVariation,
    objDistance,
    dispDuration,
    trueTrialCount,
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
    if (silhouetteResponseVer == true){
        var thisStim = `${stimFolder}${personRace}${personSex}-${personVariation}.png`;
        var objectStim = `${stimFolder}table1brown${trialType}.png`;
        var sliderStim_anchor = `${stimFolder}demo-cat-blue.png`;
        var sliderStim_object = `${stimFolder}table-response.png`;
    } else {
        var thisStim = `${stimFolder}${personRace}${personSex}-${personVariation}.png`;
        var objectStim = `${stimFolder}table1brown${trialType}.png`;
        var sliderStim_anchor = thisStim;
        var sliderStim_object = objectStim;
    }
    var persistent_prompt = `<div style="position: fixed; top: 25px; left: 50%; width: 90%; transform: translateX(-50%); text-align: center;">Click and drag the slider below to recreate the distance between the two images you saw.<br>Do your best! (The "Continue" button is at the bottom of the page)</div>`;
    


// /* target image size for slider resizing */
// // let tar_size = randomIntFromRange(40, 100); // default increment is 1
// // // let tar_size = randomIntFromRange(50, 100, 5) // increment by 5
// // let tar_size = 100;
// // let resize_decimal = tar_size*.01;

// // let target_width = Math.floor(imgWidth * resize_decimal);
// // let target_height = Math.floor(imgHeight * resize_decimal);

// // let target_x_random = randomIntFromRange(100, w-100-target_width); // accounts for img dims to not go off screen
// // let target_y_random = randomIntFromRange(50, h-50-target_height);
// // console.log(w)
// // console.log(`Where the left of the image will be positioned target_x_random: ${target_x_random}`)
// // console.log(`target_width: ${target_width}`)
// // console.log(h)
// // console.log(`Where the top of the image will be positioned target_y_random: ${target_y_random}`)
// // console.log(`target_height: ${target_height}`)

    /* creating locations for images on each trial */
    // objDistance is the edge-to-edge gap between the anchor and object images, so the object's
    // right edge sits at anchor_x + imgWidth + objDistance + objectWidth.
    let anchor_x_random = randomIntFromRange(50, w-imgWidth-objDistance-objectWidth-50); // accounts for img dims to not go off screen
    let anchor_y_random = randomIntFromRange(50, h-Math.max(imgHeight,objectHeight)-50);
    console.log(`Anchor position: x=${anchor_x_random}, y=${anchor_y_random}, imgWidth=${imgWidth}, imgHeight=${imgHeight}, objDistance=${objDistance}, screen w=${w}, h=${h}`);


    /* calculate categorical location of where anchor image is */
    if (anchor_x_random < w/2) {
        var screenside_category = "L"
    } else if (anchor_x_random >= w/2) {
        var screenside_category = "R"
    } else {
        var screenside_category = "Error"
    }


    // var slider_start = 70;
    var slider_start = 0;
    var slider_min = 0;
    var slider_max = 100;
    // Stage must be wide enough to fit the anchor + object images plus the largest true gap
    // (maxPossibleGap, params.js), with extra room so participants can over/undershoot on the slider.
    // FYI original experiment with the 150 imgWidth actually had leftover overshoot_room of 340px, 
    // just because of the sizes and that I had hardcoded a max size of the slider.
    // Keeping it at 340 for now. Do know that if we change the overshoot to be smaller, than each
    // pixel of movement that the participant makes along the slider means MORE px-per-unit sensitivity.
    var slider_overshoot_room = 340;
    var max_distance = Math.min(w, imgWidth+objectWidth+maxPossibleGap+slider_overshoot_room);

    console.log(objDistance);

    var dispSpacingResponse = {
        type: jsPsychHtmlSliderSpacing,
        anchor_stimulus: `<img src="${sliderStim_anchor}" style="width:${imgWidth}px;" />`,
        secondary_stimulus: `<img src="${sliderStim_object}" style="width:${objectWidth}px;"  />`,
        anchor_stimulus_width: imgWidth,
        secondary_stimulus_width: objectWidth,
        tallest_img_height: Math.max(imgHeight,objectHeight), //no longer have to update this variable, will simply select the variable's height that is taller.
        set_distance_pixel_max: max_distance,
        slider_start: slider_start,
        min: slider_min,
        max: slider_max,
        slider_width: 500,
        labels: ["closest","farthest"],
        trial_duration: null,
        response_ends_trial: true,
        enter_to_continue: true,
        require_movement: true,
        button_label: "Press Enter or Click to Continue",
        prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'answer'+trialType,
            trial_stimulus: thisStim,
            // correct_response: tar_size, // only for slider resizing
            slider_start: slider_start,
            min: slider_min,
            max: slider_max,
            max_slider_pixel_distance: max_distance,
            person_race: personRace, 
            person_sex: personSex,
            person_variation: personVariation,
            person_disp_duration: dispDuration,
            object_distance: objDistance,
            true_trial_count: trueTrialCount,
            anchor_x_position: anchor_x_random,
            anchor_y_position: anchor_y_random,
            secondary_x_position: anchor_x_random + imgWidth + objDistance,
            screenside_category: screenside_category,
        }, // data end
        on_finish: function(data){
            // objDistance and distance_px are both the edge-to-edge gap, so they compare directly
            data.thisDifference = data.distance_px - objDistance
        } // on finish end
    }; // dispImgSlider end


    var choiceArray = shuffle(["Looked Male", "Looked Female"])
    var sexJudge = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<p>What was the <b>gender</b> of person in the image that you saw?</p>`,
        choices: choiceArray,
        button_html: '<button class="jspsych-btn" style="font-size: 2.4vh;">%choice%</button>',
        data: {
            trial_category: 'judge'+trialType,
            trial_stimulus: thisStim,
            correct_gender: personSex,
            person_race: personRace,
            person_sex: personSex,
            person_variation: personVariation,
            person_disp_duration: dispDuration,
            object_distance: objDistance,
            true_trial_count: trueTrialCount,
            // target_x_position: target_x_random, // for slider resizing
            // target_y_position: target_y_random, // for slider resizing
            anchor_x_position: anchor_x_random,
            anchor_y_position: anchor_y_random,
            choice_array_order: choiceArray,
        },
        on_finish: function(data){
            // console.log(data.response)
            // console.log(choiceArray)
            // console.log(choiceArray[parseInt(data.response,10)])
            if (data.correct_gender == "M"){
                if (choiceArray[parseInt(data.response,10)] == "Looked Male"){
                    data.thisAcc = 1
                } else if (choiceArray[parseInt(data.response,10)] == "Looked Female"){
                    data.thisAcc = 0
                } else {
                    data.thisAcc = 98
                }
            } else if (data.correct_gender == "F"){
                if (choiceArray[parseInt(data.response,10)] == "Looked Male"){
                    data.thisAcc = 0
                } else if (choiceArray[parseInt(data.response,10)] == "Looked Female"){
                    data.thisAcc = 1
                } else {
                    data.thisAcc = 98
                }
            } else {
                data.thisAcc == 99
            }
            return 
        } // on_finish end
    } // sexJudge end

    var dispPerson = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="position: absolute; top: ${anchor_y_random}px; left: ${anchor_x_random}px;">`+
            `<img src="${thisStim}" style="width:${imgWidth}px;" />` + 
            `</div> `,
        choices: "NO_KEYS",
        trial_duration: PERSON_DISP_TIME,
        // prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'dispPerson'+trialType,
        }, // data end
    }; // dispImg end

    var dispImg = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="position: absolute; top: ${anchor_y_random}px; left: ${anchor_x_random}px;">`+
            `<img src="${thisStim}" style="width:${imgWidth}px;" />` + 
            `</div> ` +
            `<div style="position: absolute; top: ${anchor_y_random}px; left: ${anchor_x_random + imgWidth + objDistance}px;">`+
            `<img src="${objectStim}" style="width:${objectWidth}px;" />` +
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

    var attnTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `How would you describe the hairstyle you just saw?`,
        choices: ["Short Hair", "Long Hair", "Tied Back", "Unknown"],
        trial_duration: null,
        // prompt: `${persistent_prompt}`,
        data: {
            trial_category: 'attnTrial'+trialType,
        }
    }

    var prestim = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "",
        choices: "NO_KEYS",
        trial_duration: PRESTIM_DISP_TIME,
        data: {
            trial_category: 'prestim_ISI' + trialType,
        }
    };

     var poststim = {
        type: jsPsychHtmlKeyboardResponse,
        prompt: `${persistent_prompt}`,
        stimulus: ``,
        choices: "NO_KEYS",
        trial_duration: POSTSTIM_DISP_TIME,
        data: {
            trial_category: 'poststim_ISI' + trialType,
        }
    };

    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="font-size:60px;">+</div>`,
        choices: "NO_KEYS",
        trial_duration: FIXATION_DISP_TIME,
        data: {
            trial_category: 'fixation' + trialType,
        }
    };


    /*--------------------------- push single trial sequence ---------------------------*/
    // var attn_trial_list = [2,7,12,17,22,27,32,37,42,47];
    var attn_trial_list = [2,8,14,20,26,32,38,44,50];

    timelineTrialsToPush.push(if_notFull);
    timelineTrialsToPush.push(cursor_off);
    timelineTrialsToPush.push(prestim);
    timelineTrialsToPush.push(fixation);
    timelineTrialsToPush.push(dispPerson);
    timelineTrialsToPush.push(dispImg);
    timelineTrialsToPush.push(poststim)
    timelineTrialsToPush.push(cursor_on);
    timelineTrialsToPush.push(dispSpacingResponse);
    // if (attn_trial_list.includes(trueTrialCount)){
       // timelineTrialsToPush.push(attnTrial);
   // }
    // timelineTrialsToPush.push(sexJudge);


}

