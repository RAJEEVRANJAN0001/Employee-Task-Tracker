import { motion } from 'framer-motion';

/**
 * Animated Card with Corner Arrow
 */
export const CornerArrowCard = ({ title, description }) => {
    return (
        <div className="card-corner-arrow group">
            <p className="card-title">{title}</p>
            <p className="small-desc">{description}</p>
            <div className="go-corner">
                <div className="go-arrow">→</div>
            </div>

            <style jsx>{`
                .card-corner-arrow {
                    display: block;
                    position: relative;
                    max-width: 300px;
                    background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
                    border-radius: 10px;
                    padding: 2em 1.2em;
                    margin: 12px;
                    text-decoration: none;
                    z-index: 0;
                    overflow: hidden;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .card-corner-arrow:before {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    top: -16px;
                    right: -16px;
                    background: linear-gradient(135deg, #364a60, #384c6c);
                    height: 32px;
                    width: 32px;
                    border-radius: 32px;
                    transform: scale(1);
                    transform-origin: 50% 50%;
                    transition: transform 0.35s ease-out;
                }

                .card-corner-arrow:hover:before {
                    transform: scale(28);
                }

                .card-title {
                    color: #262626;
                    font-size: 1.5em;
                    line-height: normal;
                    font-weight: 700;
                    margin-bottom: 0.5em;
                    transition: all 0.5s ease-out;
                }

                .small-desc {
                    font-size: 1em;
                    font-weight: 400;
                    line-height: 1.5em;
                    color: #452c2c;
                    transition: all 0.5s ease-out;
                }

                .card-corner-arrow:hover .small-desc {
                    color: rgba(255, 255, 255, 0.8);
                }

                .card-corner-arrow:hover .card-title {
                    color: #ffffff;
                }

                .go-corner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    width: 2em;
                    height: 2em;
                    overflow: hidden;
                    top: 0;
                    right: 0;
                    background: linear-gradient(135deg, #6293c8, #384c6c);
                    border-radius: 0 10px 0 32px;
                }

                .go-arrow {
                    margin-top: -4px;
                    margin-right: -4px;
                    color: white;
                    font-family: courier, sans;
                }
            `}</style>
        </div>
    );
};

/**
 * Premium Glassmorphic Card
 */
export const GlassmorphicCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
            <div className="text-white rounded-3xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl duration-700 z-10 relative backdrop-blur-xl hover:border-white/25 overflow-hidden hover:shadow-white/5 hover:shadow-3xl w-full max-w-[350px]">
                {/* Animated Background Effects */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                    <div
                        style={{ animationDelay: '0.5s' }}
                        className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"
                    ></div>

                    <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-ping"></div>
                    <div
                        style={{ animationDelay: '1s' }}
                        className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping"
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </div>

                <div className="p-8 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        {/* Icon */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
                            <div
                                style={{ animationDelay: '0.5s' }}
                                className="absolute inset-0 rounded-full border border-white/10 animate-pulse"
                            ></div>

                            <div className="p-6 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-white/20">
                                <div className="transform group-hover:rotate-180 transition-transform duration-700">
                                    {Icon && <Icon className="w-8 h-8 text-white group-hover:text-gray-200 transition-colors duration-300 filter drop-shadow-lg" />}
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                            <p className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
                                {title}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-1 max-w-sm">
                            <p className="text-gray-300 text-sm leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300">
                                {description}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse"></div>

                        {/* Animated Dots */}
                        <div className="flex space-x-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div style={{ animationDelay: '0.1s' }} className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div style={{ animationDelay: '0.2s' }} className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </div>
    );
};

/**
 * Flip Card Component
 */
export const FlipCard = ({ frontTitle, backTitle, frontContent, backContent }) => {
    return (
        <div className="flip-card w-[300px] h-[200px]" style={{ perspective: '1000px' }}>
            <div className="flip-card-inner w-full h-full relative transition-transform duration-1000" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front */}
                <div className="flip-card-front absolute w-full h-full bg-gradient-to-br from-sky-500 to-sky-700 text-white flex flex-col items-center justify-center border-[10px] border-sky-600 rounded-xl text-xl font-bold p-4" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                    <p className="mb-2 text-center">{frontTitle}</p>
                    {frontContent && <p className="text-sm font-normal text-center">{frontContent}</p>}
                </div>

                {/* Back */}
                <div className="flip-card-back absolute w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex flex-col items-center justify-center border-[10px] border-gray-700 rounded-xl text-xl font-bold p-4" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <p className="mb-2 text-center">{backTitle}</p>
                    {backContent && <p className="text-sm font-normal text-center">{backContent}</p>}
                </div>
            </div>

            <style jsx>{`
                .flip-card:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
};

export default { CornerArrowCard, GlassmorphicCard, FlipCard };
