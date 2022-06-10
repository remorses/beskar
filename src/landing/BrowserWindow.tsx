import classNames from 'classnames'

export function BrowserWindow({
    children,
    className = '',
    host = 'example.com',
}) {
    return (
        <figure
            className={classNames(
                'relative z-[1] max-w-full h-auto rounded-b-md shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]',
                className,
            )}
        >
            <div className='relative flex items-center max-w-[50rem] bg-gray-800 rounded-t-md py-2 px-24 dark:bg-gray-700'>
                <div className='flex space-x-1 absolute top-2/4 left-4 -translate-y-1'>
                    <span className='w-2 h-2 bg-gray-600 rounded-full dark:bg-gray-600' />
                    <span className='w-2 h-2 bg-gray-600 rounded-full dark:bg-gray-600' />
                    <span className='w-2 h-2 bg-gray-600 rounded-full dark:bg-gray-600' />
                </div>
                <div className='flex justify-center items-center w-full h-full bg-gray-700 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem] dark:bg-gray-600 dark:text-gray-400'>
                    {host}
                </div>
            </div>
            <div className='rounded-b-md flex flex-col overflow-hidden'>{children}</div>
        </figure>
    )
}
