import { useEffect } from 'react';
import type { Route } from './+types/about';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About' },
    { name: 'description', content: 'Welcome to About page!' },
  ];
}

export default function About() {
  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement | null;
    const inputs = document.querySelectorAll(
      "input[name='theme']"
    ) as NodeListOf<HTMLInputElement>;

    const theme = localStorage.getItem('theme-color');

    const updateRoot = (value: string) => {
      if (root) {
        root.style.setProperty('--theme-color', `var(--${value})`);
      }
    };

    if (theme) {
      inputs.forEach((input) => {
        if (input.value === theme) {
          input.checked = true;
        }
      });
      updateRoot(theme);
    }

    inputs.forEach((input) => {
      input.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateRoot(target.value);
        localStorage.setItem('theme-color', target.value);
      };
    });
  }, []);
  return (
    <>
      <div id='example-wrapper'>
        <div id='theme-picker-section' className='example-section'>
          <input type='radio' name='theme' value='white' defaultChecked />
          <input type='radio' name='theme' value='red' />
          <input type='radio' name='theme' value='orange' />
          <input type='radio' name='theme' value='yellow' />
          <input type='radio' name='theme' value='green' />
          <input type='radio' name='theme' value='blue' />
          <input type='radio' name='theme' value='indigo' />
          <input type='radio' name='theme' value='violet' />
        </div>
        <div id='side-bar-section' className='example-section vertical'>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-alien'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-cactus'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-code'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-cat'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-blender'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-crab'></i>
          </button>
        </div>
        <div id='search-section' className='example-section'>
          <input type='text' placeholder='Search' className='example-input' />
        </div>
        <div id='view-section' className='example-section'>
          <label>View</label>
          <button type='button' className='example-button short'>
            <i className='fa-solid fa-grid-2'></i>
          </button>
          <button type='button' className='example-button short'>
            <i className='fa-solid fa-grid'></i>
          </button>
          <button type='button' className='example-button short'>
            <i className='fa-solid fa-bars'></i>
          </button>
        </div>
        <div id='progress-section' className='example-section'>
          <div className='progress-bar'>
            <div className='progress-bar-completion'></div>
          </div>
        </div>
        <div id='image-section' className='example-section vertical'>
          <img
            src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
            alt='Nature!'
          />
          <div id='image-section-rotator'>
            <button type='button' className='image-section-dot'></button>
            <button type='button' className='image-section-dot'></button>
            <button type='button' className='image-section-dot'></button>
          </div>
        </div>
        <div id='shape-section' className='example-section'>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-square'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-triangle'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-circle'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-hexagon'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-star'></i>
          </button>
          <button type='button' className='example-button'>
            <i className='fa-solid fa-rhombus'></i>
          </button>
        </div>
      </div>
    </>
  );
}
