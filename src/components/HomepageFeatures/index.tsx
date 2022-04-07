import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Prevent Unnecessary Updates',
    description: 'Compare previous data with new data and prevent unnecessary re-renders',
  },
  {
    title: 'Check Coming Data',
    description: 'Ignore updating new data or executing an effect if it is not what you want',
  },
  {
    title: 'Count updates and executions',
    description: 'Specify how many time data should be updated or an effect should be executed',
  },
];

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, ii) => (
            <Feature key={ii.toString()} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
