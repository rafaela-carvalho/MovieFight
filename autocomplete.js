// REUSABLE CODE: 
// Able to be ran several times in same project.
// Functions that takes the autocomplete config on index.js and render an autocomplete on the screen.

// Config for autocomplete.js:
// - root - element that the autocomplete should be rendered to inside of the final HTTP document.
// - renderOption() - func that knows how to render a movie;
// - onOptionSelect() - func that gets invoked when a user clicks an option;
// - fetchData() - func to find the movies;

const createAutoComplete = (
  { root, renderOption, onOptionSelect, inputValue, fetchData }
) => {
  root.innerHTML = `
    <label><b> Search </b></label>
    <input class="input" />

    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  // Reference to debounce func - utils.js
  const onInput = async event => {
    const items = await fetchData(event.target.value);
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    };

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    
    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);

      option.addEventListener('click', () => {
        // after clicking the option, the whole dropdown is removed.
        dropdown.classList.remove('is-active');
        // after clicking the option, the title selected will appear inside the input.
        input.value = inputValue(item);

        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener('input', debounce(onInput, 500));
  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
