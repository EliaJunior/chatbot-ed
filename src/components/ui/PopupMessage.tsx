'use client';

import React, { useState, useEffect, useMemo } from 'react';
// import { createPortal } from 'react-dom';
import styles from './PopupMessage.module.css';
import {
    Info, CircleCheck, TriangleAlert, CircleAlert, HelpCircle, X, XCircle
} from 'lucide-react';

export interface IPopupMessageProps {
    message: string;
    onConfirm: () => void;
    onNo?: () => void;
    showMethod?: 'modal' | 'toast-bottom-right' | 'toast-bottom-left' | 'toast-center';
    alertType?: 'info' | 'success' | 'warning' | 'danger' | 'confirm' | 'error';
    title?: string;
    autoClose?: number;
}

export default function PopupMessage({
    message,
    onConfirm,
    onNo,
    showMethod = 'modal',
    alertType = 'info',
    title,
    autoClose
}: IPopupMessageProps) {
    const [isClosing, setIsClosing] = useState(false);
    // Estado para garantir que o portal seja criado apenas no lado do cliente (navegador)
    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     // Quando o componente montar no navegador, atualiza o estado
    //     setIsMounted(true);
    // }, []);

    const typeConfig = useMemo(() => {
        const effectiveType = onNo ? 'confirm' : alertType;
        switch (effectiveType) {
            case 'success':
                return { icon: CircleCheck, className: styles.success, defaultTitle: 'Sucesso!' };
            case 'warning':
                return { icon: TriangleAlert, className: styles.warning, defaultTitle: 'Atenção!' };
            case 'danger':
                return { icon: CircleAlert, className: styles.danger, defaultTitle: 'Perigo!' };
            case 'error':
                return { icon: XCircle, className: styles.error, defaultTitle: 'Ocorreu um Erro!' };
            case 'confirm':
                return { icon: HelpCircle, className: styles.confirm, defaultTitle: 'Confirmação' };
            default:
                return { icon: Info, className: styles.info, defaultTitle: 'Informação' };
        }
    }, [alertType, onNo]);

    const IconComponent = typeConfig.icon;
    const finalTitle = title || typeConfig.defaultTitle;

    const handleClose = (callback?: () => void) => {
        setIsClosing(true);
        setTimeout(() => {
            if (callback) callback();
        }, 300); // Duração da animação de fadeOut
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (autoClose) {
            timer = setTimeout(() => handleClose(onConfirm), autoClose);
        }
        return () => clearTimeout(timer);
    }, [autoClose, onConfirm]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose(onNo || onConfirm);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onConfirm, onNo]);

    const showMethodClass = {
        'modal': styles.modal,
        'toast-bottom-right': styles.toastBottomRight,
        'toast-bottom-left': styles.toastBottomLeft,
        'toast-center': styles.toastCenter,
    }[showMethod];

    const animationClass = isClosing ? styles.fadeOut : styles.fadeIn;

    const renderButtons = () => {
        if (onNo) {
            return (
                <>
                    <button onClick={() => handleClose(onNo)} className={`${styles.button} ${styles.cancelButton}`}>
                        Não
                    </button>
                    <button onClick={() => handleClose(onConfirm)} className={`${styles.button} ${styles.confirmButton}`}>
                        Sim
                    </button>
                </>
            );
        }
        return (
            <button onClick={() => handleClose(onConfirm)} className={`${styles.button} ${styles.confirmButton}`}>
                OK
            </button>
        );
    };

    // Todo o JSX do seu componente é preparado aqui
    const popupJsx = (
        <div className={`${showMethod === 'modal' ? styles.overlay : ''} ${animationClass}`}>
            <div className={`${styles.popup} ${showMethodClass} ${typeConfig.className} ${animationClass}`}>
                <div className={styles.iconWrapper}>
                    <IconComponent size={32} />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{finalTitle}</h3>
                    <p className={styles.message}>{message}</p>
                </div>
                <div className={styles.buttonWrapper}>
                    {renderButtons()}
                </div>
                {showMethod !== 'modal' && (
                    <button onClick={() => handleClose(onNo || onConfirm)} className={styles.closeToastButton}>
                        <X size={16} />
                    </button>
                )}
                {autoClose && <div className={styles.progressBar} style={{ animationDuration: `${autoClose}ms` }} />}
            </div>
        </div>
    );

    return popupJsx
    // Se o componente estiver montado no cliente, usa o portal. Caso contrário, retorna null.
    // if (isMounted) {
    //     return createPortal(
    //         popupJsx, // O JSX que você quer renderizar
    //         document.getElementById('popup-portal')!
    //     );
    // }

    // return null;
}