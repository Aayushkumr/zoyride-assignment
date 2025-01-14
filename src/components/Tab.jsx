import { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; 

const Tab = ({ isVertical = false }) => {
    const [tabs] = useState([
        { id: 'description', label: 'Description', content: 'This premium quality clothing item is designed to offer both style and comfort. Made from high-quality materials, it ensures durability and a perfect fit. Whether you\'re dressing up for a special occasion or keeping it casual, this versatile piece is a must-have in your wardrobe. Available in various sizes to cater to your needs, it promises to enhance your fashion quotient effortlessly.' },
        { id: 'reviews', label: 'Reviews (214)', content: 'Reviews content goes here...' },
        { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
        { id: 'tab4', label: 'Tab 4', content: 'Content for Tab 4' },
        { id: 'tab5', label: 'Tab 5', content: 'Content for Tab 5' },
        { id: 'tab6', label: 'Tab 6', content: 'Content for Tab 6' },
        { id: 'tab7', label: 'Tab 7', content: 'Content for Tab 7' },
        { id: 'tab8', label: 'Tab 8', content: 'Content for Tab 8' }
    ]);
    const [activeTab, setActiveTab] = useState('description');
    const [showMore, setShowMore] = useState(false);
    const [visibleTabs, setVisibleTabs] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 450) {
                setVisibleTabs(1);
            } else if (width < 500) {
                setVisibleTabs(2);
            } else if (width < 580) {
                setVisibleTabs(3);
            } else if (width < 670) {
                setVisibleTabs(4);
            } else if (width < 770) {
                setVisibleTabs(5);
            } else if (width < 860) {
                setVisibleTabs(6);
            } else if (width < 960) {
                setVisibleTabs(7);
            } else {
                setVisibleTabs(8);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="mt-20">
                <div className={`flex ${isVertical ? 'flex-row' : 'flex-col'}`}>
                    <div className={`flex ${isVertical ? 'flex-col' : 'flex-wrap'}`}>
                        {tabs.slice(0, isVertical ? tabs.length : visibleTabs).map(tab => (
                            <button
                                key={tab.id}
                                className={`border px-5 py-3 text-sm ${activeTab === tab.id ? 'font-bold' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                        {!isVertical && tabs.length > visibleTabs && (
                            <div className="relative">
                                <button
                                    className="border px-5 py-3 text-sm flex items-center"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    More Tabs
                                    <img
                                        src={assets.dropdown_icon}
                                        alt="Dropdown Icon"
                                        className={`h-3 transition-transform ${showMore ? 'rotate-90' : 'rotate-0'}`}
                                    />
                                </button>
                                {showMore && (
                                    <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg">
                                        {tabs.slice(visibleTabs).map(tab => (
                                            <button
                                                key={tab.id}
                                                className={`block w-full text-left px-4 py-2 text-sm ${activeTab === tab.id ? 'font-bold' : ''}`}
                                                onClick={() => {
                                                    setActiveTab(tab.id);
                                                    setShowMore(false);
                                                }}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={`flex-1 ${isVertical ? 'ml-4' : 'mt-4'}`}>
                        {tabs.map(tab => (
                            activeTab === tab.id && (
                                <div key={tab.id} className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                                    <p>{tab.content}</p>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tab;
