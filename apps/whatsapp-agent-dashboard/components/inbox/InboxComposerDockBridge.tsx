"use client";

import { useEffect } from "react";

function setImportant(element: HTMLElement, property: string, value: string): void {
  element.style.setProperty(property, value, "important");
}

export default function InboxComposerDockBridge() {
  useEffect(() => {
    let frame = 0;
    let currentChat: HTMLElement | null = null;
    let currentComposer: HTMLElement | null = null;
    let currentMessages: HTMLElement | null = null;
    let currentInbox: HTMLElement | null = null;
    let chatOriginalStyle: string | null = null;
    let composerOriginalStyle: string | null = null;
    let messagesOriginalStyle: string | null = null;
    let inboxOriginalStyle: string | null = null;

    const resizeObserver = new ResizeObserver(() => schedule());

    function restoreCurrent(): void {
      resizeObserver.disconnect();

      if (currentComposer) {
        if (composerOriginalStyle === null) currentComposer.removeAttribute("style");
        else currentComposer.setAttribute("style", composerOriginalStyle);
        currentComposer.removeAttribute("data-runtime-docked");
      }

      if (currentChat) {
        if (chatOriginalStyle === null) currentChat.removeAttribute("style");
        else currentChat.setAttribute("style", chatOriginalStyle);
      }

      if (currentMessages) {
        if (messagesOriginalStyle === null) currentMessages.removeAttribute("style");
        else currentMessages.setAttribute("style", messagesOriginalStyle);
      }

      if (currentInbox) {
        if (inboxOriginalStyle === null) currentInbox.removeAttribute("style");
        else currentInbox.setAttribute("style", inboxOriginalStyle);
      }

      currentChat = null;
      currentComposer = null;
      currentMessages = null;
      currentInbox = null;
      chatOriginalStyle = null;
      composerOriginalStyle = null;
      messagesOriginalStyle = null;
      inboxOriginalStyle = null;
    }

    function rememberNodes(
      inbox: HTMLElement,
      chat: HTMLElement,
      composer: HTMLElement,
      messages: HTMLElement | null,
    ): void {
      if (
        currentInbox === inbox &&
        currentChat === chat &&
        currentComposer === composer &&
        currentMessages === messages
      ) {
        return;
      }

      restoreCurrent();
      currentInbox = inbox;
      currentChat = chat;
      currentComposer = composer;
      currentMessages = messages;
      inboxOriginalStyle = inbox.getAttribute("style");
      chatOriginalStyle = chat.getAttribute("style");
      composerOriginalStyle = composer.getAttribute("style");
      messagesOriginalStyle = messages?.getAttribute("style") ?? null;
      resizeObserver.observe(chat);
      resizeObserver.observe(composer);
    }

    function shouldDock(): boolean {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const touchDevice = navigator.maxTouchPoints > 0;
      return coarsePointer || touchDevice || window.innerWidth <= 1199;
    }

    function applyDock(): void {
      frame = 0;

      const inbox = document.querySelector<HTMLElement>(".sx-inbox");
      const chat = inbox?.querySelector<HTMLElement>(".sx-chat") ?? null;
      const composer = chat?.querySelector<HTMLElement>(".sx-composer") ?? null;
      const messages = chat?.querySelector<HTMLElement>(".sx-messages") ?? null;

      if (!inbox || !chat || !composer || !shouldDock()) {
        restoreCurrent();
        return;
      }

      rememberNodes(inbox, chat, composer, messages);

      const chatStyle = window.getComputedStyle(chat);
      const rect = chat.getBoundingClientRect();
      const visualViewport = window.visualViewport;
      const viewportWidth = visualViewport?.width ?? window.innerWidth;
      const viewportHeight = visualViewport?.height ?? window.innerHeight;
      const viewportTop = visualViewport?.offsetTop ?? 0;
      const viewportLeft = visualViewport?.offsetLeft ?? 0;
      const viewportRight = viewportLeft + viewportWidth;

      if (
        chatStyle.display === "none" ||
        rect.width < 2 ||
        rect.height < 2 ||
        rect.right <= viewportLeft ||
        rect.left >= viewportRight
      ) {
        setImportant(composer, "display", "none");
        return;
      }

      const visibleLeft = Math.max(viewportLeft, rect.left);
      const visibleRight = Math.min(viewportRight, rect.right);
      const visibleWidth = Math.max(0, visibleRight - visibleLeft);
      const browserBottomInset = Math.max(
        0,
        window.innerHeight - (viewportTop + viewportHeight),
      );

      setImportant(inbox, "transform", "none");
      setImportant(inbox, "filter", "none");
      setImportant(inbox, "perspective", "none");
      setImportant(inbox, "contain", "none");
      setImportant(chat, "transform", "none");
      setImportant(chat, "filter", "none");
      setImportant(chat, "perspective", "none");
      setImportant(chat, "contain", "none");

      setImportant(composer, "position", "fixed");
      setImportant(composer, "left", `${visibleLeft}px`);
      setImportant(composer, "right", "auto");
      setImportant(composer, "bottom", `${browserBottomInset}px`);
      setImportant(composer, "top", "auto");
      setImportant(composer, "width", `${visibleWidth}px`);
      setImportant(composer, "max-width", `${visibleWidth}px`);
      setImportant(composer, "min-width", "0");
      setImportant(composer, "min-height", "64px");
      setImportant(composer, "max-height", `${Math.max(120, Math.min(320, viewportHeight * 0.5))}px`);
      setImportant(composer, "display", "block");
      setImportant(composer, "visibility", "visible");
      setImportant(composer, "opacity", "1");
      setImportant(composer, "transform", "none");
      setImportant(composer, "overflow-x", "hidden");
      setImportant(composer, "overflow-y", "auto");
      setImportant(composer, "z-index", "2147483000");
      setImportant(composer, "background", "#ffffff");
      setImportant(composer, "box-shadow", "0 -10px 28px rgba(15, 23, 42, 0.16)");
      composer.setAttribute("data-runtime-docked", "true");

      const row = composer.querySelector<HTMLElement>(".sx-composer-row");
      const textarea = composer.querySelector<HTMLTextAreaElement>("textarea");
      if (row) {
        setImportant(row, "display", "grid");
        setImportant(row, "grid-template-columns", "auto minmax(0, 1fr) auto auto auto");
        setImportant(row, "width", "100%");
        setImportant(row, "min-width", "0");
      }
      if (textarea) {
        setImportant(textarea, "display", "block");
        setImportant(textarea, "visibility", "visible");
        setImportant(textarea, "opacity", "1");
        setImportant(textarea, "width", "100%");
        setImportant(textarea, "min-width", "0");
        setImportant(textarea, "min-height", "44px");
        setImportant(textarea, "font-size", "16px");
      }

      if (visibleWidth < 720) {
        const channelNote = composer.querySelector<HTMLElement>(".sx-composer-channel-note");
        const tools = composer.querySelector<HTMLElement>(".sx-composer-tools");
        const divider = composer.querySelector<HTMLElement>(".sx-composer-divider");
        if (channelNote) setImportant(channelNote, "display", "none");
        if (tools) setImportant(tools, "display", "none");
        if (divider) setImportant(divider, "display", "none");
        if (row) {
          setImportant(row, "grid-template-columns", "auto minmax(0, 1fr) auto");
        }
      }

      const composerHeight = Math.max(64, composer.getBoundingClientRect().height);
      setImportant(chat, "padding-bottom", `${composerHeight}px`);
      if (messages) {
        setImportant(messages, "padding-bottom", "16px");
        setImportant(messages, "overflow-y", "auto");
        setImportant(messages, "min-height", "0");
      }
    }

    function schedule(): void {
      if (frame) return;
      frame = window.requestAnimationFrame(applyDock);
    }

    const mutationObserver = new MutationObserver(() => schedule());
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("orientationchange", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.visualViewport?.addEventListener("resize", schedule, { passive: true });
    window.visualViewport?.addEventListener("scroll", schedule, { passive: true });

    schedule();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      window.removeEventListener("scroll", schedule, true);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      restoreCurrent();
    };
  }, []);

  return null;
}
