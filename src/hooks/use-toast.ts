import * as React from "react";
import { toast as sonnerToast, type ExternalToast } from "sonner";

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "destructive" | "success";
  duration?: number;
};

type ToastReturn = {
  id: string | number;
  dismiss: () => void;
  update: (props: ToastProps) => void;
};

/**
 * Toast function that wraps Sonner's toast API
 * Maintains compatibility with the previous API while using Sonner under the hood
 */
function toast({ title, description, action, variant = "default", duration, ...props }: ToastProps & ExternalToast): ToastReturn {
  const toastOptions: ExternalToast = {
    duration,
    ...props,
  };

  // Handle action button
  if (action) {
    toastOptions.action = {
      label: action.label,
      onClick: action.onClick,
    };
  }

  // Map variant to Sonner's toast methods
  // Sonner uses: toast(message, { description: "..." })
  let toastId: string | number;
  const message = title || description || "";
  const toastDescription = title && description ? description : (title ? undefined : description);
  
  if (variant === "destructive") {
    toastId = sonnerToast.error(message, {
      description: toastDescription,
      ...toastOptions,
    });
  } else if (variant === "success") {
    toastId = sonnerToast.success(message, {
      description: toastDescription,
      ...toastOptions,
    });
  } else {
    toastId = sonnerToast(message, {
      description: toastDescription,
      ...toastOptions,
    });
  }

  return {
    id: toastId,
    dismiss: () => sonnerToast.dismiss(toastId),
    update: (newProps: ToastProps) => {
      // Dismiss the old toast first
      sonnerToast.dismiss(toastId);
      
      const newMessage = newProps.title || newProps.description || "";
      const newDescription = newProps.title && newProps.description ? newProps.description : (newProps.title ? undefined : newProps.description);
      
      const updateOptions: ExternalToast = {
        description: newDescription,
        duration: newProps.duration !== undefined ? newProps.duration : duration,
        ...props,
      };

      if (newProps.action) {
        updateOptions.action = {
          label: newProps.action.label,
          onClick: newProps.action.onClick,
        };
      }

      // Create new toast with updated content
      // Note: This creates a new toast ID, which is how Sonner works
      if (newProps.variant === "destructive") {
        sonnerToast.error(newMessage, updateOptions);
      } else if (newProps.variant === "success") {
        sonnerToast.success(newMessage, updateOptions);
      } else {
        sonnerToast(newMessage, updateOptions);
      }
    },
  };
}

/**
 * Hook for toast functionality
 * Returns toast function and dismiss utility
 */
function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
  };
}

export { useToast, toast };
