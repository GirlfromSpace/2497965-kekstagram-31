const imgPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectList = document.querySelector('.img-upload__effects');
let filter = 'none';

const filterSettings = {
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    style: 'glayscale',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
  start: 1,
  step: 0.1,
  style: 'sepia',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'brightness',
  },
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function getCurrentFilter () {
  return effectList.querySelector('input[name=effect]:checked').value;

}

function updateEffectLevel (effect, level) {
  const filterSet = filterSettings[effect];
  return `${filterSet.style}(${level}${filterSet.unit || ''})`
}

function updateSlider () {
  if (filter === 'none') {
    return;
  }
  effectLevel.value = slider.noUiSlider.get();
  imgPreview.style.filter = updateEffectLevel(filter, effectLevel.value);
}

effectList.addEventListener('change', () => {
  imgPreview.classList.remove(`effects__preview--${filter}`);
  filter = getCurrentFilter();
  imgPreview.classList.add(`effects__preview--${filter}`);
  if (filter === 'none') {
    slider.classList.add('hidden');
  } else {
    slider.noUiSlider.updateOptions(filterSettings[filter]);
  }
})
slider.noUiSlider.on('update', updateSlider);
