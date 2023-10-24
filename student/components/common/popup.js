/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Popup({
  onPressAnyOption,
  message,
  title,
  okMessage,
  cancelMessage,
  index = 10,
  Icon,
  show = true,
  hideOption,
}) {
  const [open, setOpen] = useState(true)

  const okButtonRef = useRef(null)

  const onclick = async (ok) => {
    await onPressAnyOption(ok)
    // setOpen(false);
  }

  const hidePopup = async () => {
    hideOption ? hideOption() : await onPressAnyOption(false)
    // setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className={`fixed z-${index} inset-0 overflow-y-auto `}
        initialFocus={okButtonRef}
        open={open}
        onClose={hidePopup}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-3/4 transform overflow-hidden rounded-lg   bg-white pt-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 md:p-4 md:pb-4">
                <div className="sm:flex sm:items-center">
                  <div className="mx-auto   flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100  sm:mx-0 sm:h-10 sm:w-10">
                    <Icon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-2 px-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {/* <Dialog.Title
                      as="h3"
                      className="text-base capitalize leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title> */}
                    <div className=" text-center ">
                      <p className="text-sm text-gray-500 md:text-base">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 px-4 pb-4 text-center text-primaryText sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  ref={okButtonRef}
                  className="inline-flex justify-center  rounded-md  border border-transparent bg-primary px-8 py-1 text-base font-medium   focus:outline-none focus:ring-2   sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={async () => {
                    await onclick(true)
                  }}
                >
                  {okMessage}
                </button>
                {show && (
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50  focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={async () => {
                      await onclick(false)
                    }}
                  >
                    {cancelMessage}
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
