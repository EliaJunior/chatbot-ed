'use client';

import React from 'react';
import styles from './LoadingState.module.css';
import { Loader2 } from 'lucide-react';

// Depois (adicione 'export')
export type SkeletonElement = {
    variant: 'text' | 'rect' | 'circle';
    width?: string | number;
    height?: string | number;
    count?: number;
    className?: string;
};

export interface ILoadingStateProps {
    type?: 'overlay' | 'spinner' | 'skeleton';
    message?: string;
    skeletonConfig?: SkeletonElement[];
    className?: string;
}

export default function LoadingState({
    type = 'spinner',
    message,
    skeletonConfig,
    className
}: ILoadingStateProps) {

    const renderSkeleton = () => (
        <div className={`${styles.skeletonWrapper} ${className || ''}`}>
            {skeletonConfig?.map((config, index) => {
                const elements = Array.from({ length: config.count || 1 });
                return elements.map((_, i) => (
                    <div
                        key={`${index}-${i}`}
                        className={`${styles.skeleton} ${styles[config.variant]} ${config.className || ''}`}
                        style={{ width: config.width, height: config.height }}
                    />
                ));
            })}
        </div>
    );

    const renderSpinner = () => (
        <div className={`${styles.spinnerWrapper} ${className || ''}`}>
            <Loader2 size={32} className={styles.spinner} />
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );

    const renderOverlay = () => (
        <div className={styles.overlay}>
            <div className={styles.overlayContent}>
                <Loader2 size={40} className={styles.spinner} />
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );

    switch (type) {
        case 'overlay':
            return renderOverlay();
        case 'skeleton':
            return renderSkeleton();
        case 'spinner':
        default:
            return renderSpinner();
    }
}