var jsPsychHtmlSliderSpacing = (function (jspsych) {
  'use strict';

  var version = "1.0.0";

  const info = {
    name: "html-slider-spacing",
    version,
    parameters: {
      /** The HTML string for the anchor (fixed) stimulus */
      anchor_stimulus: {
        type: jspsych.ParameterType.HTML_STRING,
        default: void 0
      },
      /** The HTML string for the secondary (movable) stimulus */
      secondary_stimulus: {
        type: jspsych.ParameterType.HTML_STRING,
        default: void 0
      },
      /** Width of the anchor stimulus in pixels */
      anchor_stimulus_width: {
        type: jspsych.ParameterType.INT,
        default: 100
      },
      /** Width of the secondary stimulus in pixels */
      secondary_stimulus_width: {
        type: jspsych.ParameterType.INT,
        default: 100
      },
      /** If false, stage width is 100% of the container. If a number, sets the stage to that exact pixel width. */
      set_distance_pixel_max: {
        type: jspsych.ParameterType.INT,
        default: false
      },
      /** Sets the minimum value of the slider. */
      min: {
        type: jspsych.ParameterType.INT,
        default: 0
      },
      /** Sets the maximum value of the slider. Capped at 100. */
      max: {
        type: jspsych.ParameterType.INT,
        default: 100
      },
      /** Sets the starting value of the slider */
      slider_start: {
        type: jspsych.ParameterType.INT,
        default: 0
      },
      /** Sets the step of the slider */
      step: {
        type: jspsych.ParameterType.INT,
        default: 1
      },
      /** Labels displayed at equidistant locations on the slider */
      labels: {
        type: jspsych.ParameterType.HTML_STRING,
        default: [],
        array: true
      },
      /** Set the width of the slider in pixels. If null, uses full container width. */
      slider_width: {
        type: jspsych.ParameterType.INT,
        default: null
      },
      /** Label of the button to end the trial. */
      button_label: {
        type: jspsych.ParameterType.STRING,
        default: "Continue",
        array: false
      },
      /** If true, the participant must move the slider before clicking continue. */
      require_movement: {
        type: jspsych.ParameterType.BOOL,
        default: false
      },
      /** HTML content displayed below the stimulus area. */
      prompt: {
        type: jspsych.ParameterType.HTML_STRING,
        default: null
      },
      /** How long to display the stimuli in milliseconds. */
      stimulus_duration: {
        type: jspsych.ParameterType.INT,
        default: null
      },
      /** How long to wait for a response before ending the trial. */
      trial_duration: {
        type: jspsych.ParameterType.INT,
        default: null
      },
      /** If true, the trial ends when the participant responds. */
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      /** If true, pressing Enter submits the response. */
      enter_to_continue: {
        type: jspsych.ParameterType.BOOL,
        default: false
      },
      /** Height in pixels of the tallest image. The stage (and thus the slider/button below it) will be at least this tall, preventing overlap. */
      tallest_img_height: {
        type: jspsych.ParameterType.INT,
        default: 200
      }
    },
    data: {
      rt: { type: jspsych.ParameterType.INT },
      response: { type: jspsych.ParameterType.INT },
      distance_px: { type: jspsych.ParameterType.FLOAT },
      anchor_stimulus: { type: jspsych.ParameterType.HTML_STRING },
      secondary_stimulus: { type: jspsych.ParameterType.HTML_STRING },
      slider_start: { type: jspsych.ParameterType.INT }
    },
    citations: {
      "apa": "de Leeuw, J. R., Gilbert, R. A., & Luchterhandt, B. (2023). jsPsych: Enabling an Open-Source Collaborative Ecosystem of Behavioral Experiments. Journal of Open Source Software, 8(85), 5351. https://doi.org/10.21105/joss.05351 ",
      "bibtex": '@article{Leeuw2023jsPsych, 	author = {de Leeuw, Joshua R. and Gilbert, Rebecca A. and Luchterhandt, Bj{\\" o}rn}, 	journal = {Journal of Open Source Software}, 	doi = {10.21105/joss.05351}, 	issn = {2475-9066}, 	number = {85}, 	year = {2023}, 	month = {may 11}, 	pages = {5351}, 	publisher = {Open Journals}, 	title = {jsPsych: Enabling an {Open}-{Source} {Collaborative} {Ecosystem} of {Behavioral} {Experiments}}, 	url = {https://joss.theoj.org/papers/10.21105/joss.05351}, 	volume = {8}, }  '
    }
  };

  class HtmlSliderSpacingPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static {
      this.info = info;
    }
    trial(display_element, trial) {
      const effectiveMax = Math.min(trial.max, 100);
      const half_thumb_width = 7.5;

      const stageWidth_style = trial.set_distance_pixel_max !== false
        ? `width: ${trial.set_distance_pixel_max}px; margin: 0 auto;`
        : `width: 100%;`;

      var html = '<div id="jspsych-html-slider-spacing-wrapper" style="margin: 0px 0px;">';

      html += `<div id="jspsych-html-slider-spacing-stage" style="position: relative; ${stageWidth_style} height: ${trial.tallest_img_height}px; margin-bottom: 1em;">`;

      html += `<div id="jspsych-html-slider-spacing-anchor" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: ${trial.anchor_stimulus_width}px;">`;
      html += trial.anchor_stimulus;
      html += '</div>';

      html += `<div id="jspsych-html-slider-spacing-secondary" style="position: absolute; top: 50%; transform: translateY(-50%); width: ${trial.secondary_stimulus_width}px;">`;
      html += trial.secondary_stimulus;
      html += '</div>';

      html += '</div>'; // end stage

      html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 0.5em auto;';
      if (trial.slider_width !== null) {
        html += `width:${trial.slider_width}px;`;
      } else {
        html += 'width:auto;';
      }
      html += '">';

      html += `<input type="range" class="jspsych-slider" value="${trial.slider_start}" min="${trial.min}" max="${effectiveMax}" step="${trial.step}" style="width: 100%;" id="jspsych-html-slider-spacing-response">`;

      html += '<div>';
      for (var j = 0; j < trial.labels.length; j++) {
        var label_width_perc = 100 / (trial.labels.length - 1);
        var percent_of_range = j * (100 / (trial.labels.length - 1));
        var percent_dist_from_center = ((percent_of_range - 50) / 50) * 100;
        var offset = (percent_dist_from_center * half_thumb_width) / 100;
        html += `<div style="border: 1px solid transparent; display: inline-block; position: absolute; left:calc(${percent_of_range}% - (${label_width_perc}% / 2) - ${offset}px); text-align: center; width: ${label_width_perc}%;">`;
        html += `<span style="text-align: center; font-size: 80%;">${trial.labels[j]}</span>`;
        html += '</div>';
      }
      html += '</div>';
      html += '</div>'; // end slider container
      html += '</div>'; // end wrapper

      if (trial.prompt !== null) {
        html += trial.prompt;
      }

      html += `<button id="jspsych-html-slider-spacing-next" class="jspsych-btn" ${trial.require_movement ? 'disabled' : ''} style="position: relative; z-index: 1;">${trial.button_label}</button>`;

      display_element.innerHTML = html;

      const stageEl = display_element.querySelector('#jspsych-html-slider-spacing-stage');
      const secondaryEl = display_element.querySelector('#jspsych-html-slider-spacing-secondary');
      const sliderEl = display_element.querySelector('#jspsych-html-slider-spacing-response');

      const updateSecondaryPosition = (value) => {
        const stageWidth = trial.set_distance_pixel_max !== false
          ? trial.set_distance_pixel_max
          : stageEl.offsetWidth;
        const minLeft = trial.anchor_stimulus_width;
        const maxLeft = stageWidth - trial.secondary_stimulus_width;
        const range = effectiveMax - trial.min;
        const t = range > 0 ? (value - trial.min) / range : 0;
        const leftPx = minLeft + t * (maxLeft - minLeft);
        secondaryEl.style.left = `${leftPx}px`;
      };

      updateSecondaryPosition(trial.slider_start);

      sliderEl.addEventListener('input', (e) => {
        updateSecondaryPosition(e.target.valueAsNumber);
      });
      sliderEl.addEventListener('change', (e) => {
        updateSecondaryPosition(e.target.valueAsNumber);
      });

      var slider_has_moved = false;
      var keyHandler = null;

      if (trial.require_movement) {
        const enable_button = () => {
          slider_has_moved = true;
          display_element.querySelector('#jspsych-html-slider-spacing-next').disabled = false;
        };
        sliderEl.addEventListener('mousedown', enable_button);
        sliderEl.addEventListener('touchstart', enable_button);
        sliderEl.addEventListener('change', enable_button);
      }

      var response = { rt: null, response: null };

      const end_trial = () => {
        if (keyHandler !== null) {
          document.removeEventListener('keydown', keyHandler);
          keyHandler = null;
        }
        const stageWidth = trial.set_distance_pixel_max !== false
          ? trial.set_distance_pixel_max
          : stageEl.offsetWidth;
        const range = effectiveMax - trial.min;
        const t = range > 0 ? (response.response - trial.min) / range : 0;
        const distance_px = t * (stageWidth - trial.anchor_stimulus_width - trial.secondary_stimulus_width);
        this.jsPsych.finishTrial({
          rt: response.rt,
          anchor_stimulus: trial.anchor_stimulus,
          secondary_stimulus: trial.secondary_stimulus,
          slider_start: trial.slider_start,
          response: response.response,
          distance_px: distance_px
        });
      };

      display_element.querySelector('#jspsych-html-slider-spacing-next').addEventListener('click', () => {
        var endTime = performance.now();
        response.rt = Math.round(endTime - startTime);
        response.response = sliderEl.valueAsNumber;
        if (trial.response_ends_trial) {
          end_trial();
        } else {
          display_element.querySelector('#jspsych-html-slider-spacing-next').disabled = true;
        }
      });

      if (trial.enter_to_continue) {
        keyHandler = (e) => {
          if (e.key === 'Enter') {
            if (trial.require_movement && !slider_has_moved) return;
            const btn = display_element.querySelector('#jspsych-html-slider-spacing-next');
            if (btn && !btn.disabled) btn.click();
          }
        };
        document.addEventListener('keydown', keyHandler);
      }

      if (trial.stimulus_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(() => {
          stageEl.style.visibility = 'hidden';
        }, trial.stimulus_duration);
      }

      if (trial.trial_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
      }

      var startTime = performance.now();
    }

    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == 'data-only') {
        load_callback();
        this.simulate_data_only(trial, simulation_options);
      }
      if (simulation_mode == 'visual') {
        this.simulate_visual(trial, simulation_options, load_callback);
      }
    }

    create_simulation_data(trial, simulation_options) {
      const effectiveMax = Math.min(trial.max, 100);
      const default_data = {
        anchor_stimulus: trial.anchor_stimulus,
        secondary_stimulus: trial.secondary_stimulus,
        slider_start: trial.slider_start,
        response: this.jsPsych.randomization.randomInt(trial.min, effectiveMax),
        rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true)
      };
      const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
      this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
      return data;
    }

    simulate_data_only(trial, simulation_options) {
      const data = this.create_simulation_data(trial, simulation_options);
      this.jsPsych.finishTrial(data);
    }

    simulate_visual(trial, simulation_options, load_callback) {
      const data = this.create_simulation_data(trial, simulation_options);
      const display_element = this.jsPsych.getDisplayElement();
      this.trial(display_element, trial);
      load_callback();
      if (data.rt !== null) {
        const el = display_element.querySelector("input[type='range']");
        setTimeout(() => {
          this.jsPsych.pluginAPI.clickTarget(el);
          el.valueAsNumber = data.response;
        }, data.rt / 2);
        this.jsPsych.pluginAPI.clickTarget(display_element.querySelector('button'), data.rt);
      }
    }
  }

  return HtmlSliderSpacingPlugin;

})(jsPsychModule);