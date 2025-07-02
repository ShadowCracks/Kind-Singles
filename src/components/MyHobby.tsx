import React from 'react';
import { Heart, Mic, Video, Mail } from 'lucide-react';
import profileImage from '../assets/profile.png';

const MyHobby: React.FC = () => {
    return (
        <>
            {/* Main Profile Section */}

            <div className="flex-1 pl-4 py-4 border-gray-300 border rounded-lg">
                {/* Profile Header */}
                <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-38 h-38 rounded-lg object-cover"
                        />
                        <div className="flex justify-center space-x-2 mt-3">
                            <button className="text-pink-500 rounded-full ">
                                <Mail
                                    fill='pink'
                                    stroke="currentColor"
                                    className="w-4 h-4" />
                            </button>
                            <button className=" text-blue-500 rounded-full ">
                                <Heart
                                    className="w-4 h-4" />
                            </button>
                            <button className=" text-gray-500 rounded-full ">
                                <Mic className="w-4 h-4" />
                            </button>
                            <button className=" text-gray-500 rounded-full ">
                                <Video
                                    fill='gray'
                                    className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1  w-full">
                        <div className="flex items-center space-x-2 mb-2">
                            <h1 className="text-3xl font-bold text-gray-800">Sophie</h1>
                        </div>
                        <div className=" flex items-center space-x-2 mb-2">
                            <span className="w-4 h-4 bg-blue-200 rounded-full "></span>
                            <span>30 | Toronto ON </span> <span className="w-4 h-4 bg-blue-200 rounded-full "></span><span>Looking for a Man | 28-40 </span>


                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">This matters to me:</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                <div>• Non-smoker</div>
                                <div>• Open to kids</div>
                                <div>• Light drinker</div>
                                <div>• Helps maintain clean home</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interests */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Some experiences I'd love to share with you...</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-400 text-white text-sm rounded-full">PHILOSOPHY</span>
                        <span className="px-3 py-1 bg-blue-400 text-white text-sm rounded-full">BAD JOKES</span>
                        <span className="px-3 py-1 bg-blue-400 text-white text-sm rounded-full">GAMING</span>
                        <span className="px-3 py-1 bg-blue-400 text-white text-sm rounded-full">VOLUNTEERING</span>
                        <span className="px-3 py-1 bg-blue-400 text-white text-sm rounded-full">EXTREME SPORTS</span>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col py-4 rounded-lg">

                    <div className=" lg:w-6/12 md:w-7/12">
                        {/* Q&A Section */}
                        <div className="space-y-4 mb-6">
                            <div className="bg-white border-gray-300 border p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">"What kind of weird are you?"</h4>
                                <p className="text-gray-700 text-sm">
                                    I eat cereal with a fork so the milk doesn't get in the way of the crunch.
                                    Don't judge me.
                                </p>
                            </div>
                            <div className="bg-white border-gray-300 border p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">"What do you imagine being like... together?"</h4>
                                <p className="text-gray-700 text-sm">
                                    I imagine us laughing over inside jokes while cooking dinner together,
                                    music playing in the background. We'd support each other's weird ideas and
                                    big dreams, and take turns being the calm one when life gets messy. Lazy
                                    Sunday mornings would be our thing—reading, cuddling, or just doing nothing
                                    in particular. Even the errands would feel lighter, knowing we're in it together.
                                </p>
                            </div>
                        </div>

                        <div
                            className="border border-gray-300 rounded-lg w-3/4 my-4 mx-auto"
                        >

                        </div>

                        {/* Beatbox Bio */}
                        <div className="">
                            <h3 className="font-semibold text-gray-800 mb-4">box Bio (Fill-in-the-Blank & Optional)</h3>

                            <div className="space-y-3 text-sm bg-blue-100 p-4 rounded-lg">
                                <div>
                                    <p>Where's the guy who's <span className="font-semibold">spontaneous and free</span></p>
                                    <p>Yet <span className="underline">grounded enough to be heading where he wants to be</span></p>
                                </div>

                                <div>
                                    <p>Where's the guy who knows that <span className="underline">life is more than a day's pay</span></p>
                                    <p>And isn't on here <span className="underline">just looking for a good cough</span></p>
                                </div>

                                <div className="text-blue-600 font-medium">
                                    🎵 RECORD SCRATCHIN' 🎵
                                </div>

                                <div>
                                    <p>Where's the guy who's <span className="underline">confident enough to not be a sheep</span></p>
                                    <p>It's not <span className="underline">tangible things that sweep this gal</span> off her feet</p>
                                </div>

                                <div>
                                    <p>Where's the guy who's <span className="underline">considerate enough to keep in touch</span></p>
                                    <p>But isn't <span className="underline">hung up on clinginess or co-dependence and such</span></p>
                                </div>

                                <div>
                                    <p>Where's the guy who knows <span className="underline">how precious life is</span></p>
                                    <p>And doesn't waste his time <span className="underline">fighting over meaningless things</span></p>
                                </div>

                                <div className="text-blue-600 font-medium">
                                    🎵 RECORD SCRATCHIN' 🎵
                                </div>

                                <p className="font-medium">Awe yeah... break it down for me fellas!</p>

                                <div>
                                    <p>See, I'm lookin' for a guy who may not consider himself rare</p>
                                    <p><span className="underline">To share life's adventures</span>, but I can't <span className="underline">find him anywhere!</span></p>
                                </div>

                                <div>
                                    <p>And when the <span className="underline">candy-coated conversations</span> are all said and done</p>
                                    <p>The <span className="underline">connection and chemistry left</span> will tell me you're the one.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="text-black font-bold text-sm lg:w-3/12 md:w-4/12 w-full ml-auto md:mt-0 mt-4">
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Orientation</span>
                            <span className="font-medium  w-1/2">Heterosexual</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Ethnicity</span>
                            <span className="font-medium  w-1/2">Caucasian</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Longest Relat.</span>
                            <span className="font-medium  w-1/2">5+ Years</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Height</span>
                            <span className="font-medium  w-1/2">5' 5"</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Body Type</span>
                            <span className="font-medium  w-1/2">Athletic</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Hair Colour</span>
                            <span className="font-medium  w-1/2">Blonde</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Diet</span>
                            <span className="font-medium  w-1/2">Ketovore</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Smokes</span>
                            <span className="font-medium  w-1/2">No</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Alcohol</span>
                            <span className="font-medium  w-1/2">Socially</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Drugs</span>
                            <span className="font-medium  w-1/2">No</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Marijuana</span>
                            <span className="font-medium  w-1/2">No</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Western Zodiac</span>
                            <span className="font-medium  w-1/2">Taurus</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Chinese Zodiac</span>
                            <span className="font-medium  w-1/2">Rabbit</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Religion</span>
                            <span className="font-medium  w-1/2">Spiritual</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Education</span>
                            <span className="font-medium  w-1/2">University</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Status</span>
                            <span className="font-medium  w-1/2">Single</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Free Time</span>
                            <span className="font-medium  w-1/2">Eves/Weekends</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Offspring I Desire</span>
                            <span className="font-medium  w-1/2">No | Open</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Employment</span>
                            <span className="font-medium  w-1/2">Full time</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Healthcare</span>
                            <span className="font-medium  w-1/2">East & West</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Therapy Views</span>
                            <span className="font-medium  w-1/2">Open</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Personal Growth</span>
                            <span className="font-medium  w-1/2">A Priority</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Pets</span>
                            <span className="font-medium  w-1/2">Cat</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Dwelling</span>
                            <span className="font-medium  w-1/2">House</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-white">
                            <span className="">Political Views</span>
                            <span className="font-medium  w-1/2">Right Leaning</span>
                        </div>
                        <div className="flex justify-between  p-4 bg-gray-200">
                            <span className="">Upbringing</span>
                            <span className="font-medium  w-1/2">Small Town</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default MyHobby;