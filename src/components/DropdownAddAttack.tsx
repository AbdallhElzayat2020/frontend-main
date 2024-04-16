import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownAddAttack = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to='#'
        className='bg-gray relative flex h-8.5 w-8.5 items-center justify-center rounded-full  border-[0.5px] border-primary-70 text-primary-70 hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='h-5 w-5'
        >
          <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
        </svg>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-primary-70 dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className='px-4.5 py-3'>
          <h5 className='text-sm font-medium text-bodydark2'>Notification</h5>
        </div>

        <ul className='flex h-auto flex-col overflow-y-auto'>
          <li>
            <Link
              className='hover:bg-gray-2 flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 dark:border-strokedark dark:hover:bg-meta-4'
              to='#'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  Edit your information in a swipe
                </span>{' '}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className='text-xs'>12 May, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className='hover:bg-gray-2 flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 dark:border-strokedark dark:hover:bg-meta-4'
              to='#'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  It is a long established fact
                </span>{' '}
                that a reader will be distracted by the readable.
              </p>

              <p className='text-xs'>24 Feb, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className='hover:bg-gray-2 flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 dark:border-strokedark dark:hover:bg-meta-4'
              to='#'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  There are many variations
                </span>{' '}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className='text-xs'>04 Jan, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className='hover:bg-gray-2 flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 dark:border-strokedark dark:hover:bg-meta-4'
              to='#'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  There are many variations
                </span>{' '}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className='text-xs'>01 Dec, 2024</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownAddAttack;
