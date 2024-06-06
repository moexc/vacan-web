import { FC, Fragment, useEffect, useState } from "react"
import { AddressVO, getAddressApi } from "../config/api/address"
import { Dialog, Transition } from '@headlessui/react';
import IconX from "./Icon/IconX";

const AddressSelect: FC<{
    show: boolean
    close: () => void
    onChange: (data: string) => void
}> = ({show, close, onChange}) => {

    const [address, setAddress] = useState<AddressVO[]>([])
    const [filterAddress, setFilterAddress] = useState<AddressVO[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        getAddressApi((data: AddressVO[]) => {
            setAddress(() => {
                setFilterAddress(data)
                return data
            })
        })
    }, [])

    useEffect(() => {
        searchAddress()
    }, [search]);

    const searchAddress = () =>{
        setFilterAddress(address.filter(item => item.address.includes(search)))
    }

    return(
        <div className="mb-5 space-y-5">

            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" open={show} onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">选择收货地址</h5>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={close}>
                                            <IconX/>
                                        </button>
                                    </div>
                                    <div className="p-5 min-h-[300px]">

                                        <div className="mx-auto w-1/2 mb-3 relative">
                                            <input
                                                type="text"
                                                placeholder="搜索"
                                                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider pl-11"
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <div className="p-4 border border-white-dark/20 rounded-lg space-y-3 overflow-x-auto w-full block">
                                            <div className="bg-white rounded-xl px-2 flex items-center justify-between font-semibold"
                                            >
                                                <div>地址</div>
                                                <div>邮编</div>
                                            </div>
                                            {filterAddress.map((item) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="bg-white dark:bg-[#1b2e4b] rounded-xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] p-2 flex items-center justify-between
                                                            text-gray-500 font-semibold hover:text-primary transition-all duration-300 hover:scale-[1.01]"
                                                        onClick={() => onChange(item.address)}
                                                    >
                                                        <div>{item.address}</div>
                                                        <div>{item.postCode}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            
        </div>
    )
}

export default AddressSelect