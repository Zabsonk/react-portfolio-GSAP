import { type ReactElement } from 'react';
import { experienceStats } from '../constants';

const Experience = (): ReactElement => {
    return (
        <section className="experience" id="experience">
            <h1 className="experience-title">My Experience</h1>
            <p className="experience-desc">
                Computer Science graduate specializing in IT Systems Infrastructure. I build
                interactive web apps and games — from concept to deployment.
            </p>
            <div className="experience-grid">
                {experienceStats.map((stat, index) => (
                    <div key={index} className="experience-card">
                        <span className="experience-value">{stat.value}</span>
                        <span className="experience-label">{stat.desc}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
