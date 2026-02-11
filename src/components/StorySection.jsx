import { useEffect, useRef } from 'react';

const StorySection = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const msg2Ref = useRef(null);
  const exitTriggerRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.15 };
    
    // Using a class on body to control the tree state as in the original project
    const heroObserver = new IntersectionObserver((entries) => {
      document.body.classList.toggle("hero-out", !entries[0].isIntersecting);
    }, observerOptions);

    const storyObserver = new IntersectionObserver((entries) => {
      const inStory = entries[0].isIntersecting;
      document.body.classList.toggle("tree-on", inStory);
      if (!inStory) {
        document.body.classList.remove("tree-exit", "tree-bright");
      }
    }, { threshold: 0.01 });

    const msg2Observer = new IntersectionObserver((entries) => {
      document.body.classList.toggle("tree-bright", entries[0].isIntersecting);
    }, { threshold: 0.55 });

    const exitObserver = new IntersectionObserver((entries) => {
      document.body.classList.toggle("tree-exit", entries[0].isIntersecting);
    }, { threshold: 0.55 });

    const heroEl = document.getElementById('hero');
    if (heroEl) heroObserver.observe(heroEl);
    if (storyRef.current) storyObserver.observe(storyRef.current);
    if (msg2Ref.current) msg2Observer.observe(msg2Ref.current);
    if (exitTriggerRef.current) exitObserver.observe(exitTriggerRef.current);

    return () => {
      heroObserver.disconnect();
      storyObserver.disconnect();
      msg2Observer.disconnect();
      exitObserver.disconnect();
    };
  }, []);

  return (
    <section className="story" id="story" ref={storyRef}>
      <div className="messages">
        <div className="msg">
          <div className="card">
            <h2>Message 1</h2>
            <p>Tree is fixed at the bottom; messages scroll on top of it.</p>
          </div>
        </div>

        <div className="msg" id="msg2" ref={msg2Ref}>
          <div className="card">
            <h2>Message 2</h2>
            <p>When this reaches mid-view, the tree brightens.</p>
          </div>
        </div>

        <div className="msg">
          <div className="card">
            <h2>Message 3</h2>
            <p>The tree remains fixed and fully visible.</p>
          </div>
        </div>

        {[4, 5, 6].map(num => (
          <div className="msg" key={num}>
            <div className="card">
              <h2>Message {num}</h2>
              <p>More messages...</p>
            </div>
          </div>
        ))}

        <div className="msg" id="exitTrigger" ref={exitTriggerRef}>
          <div className="card">
            <h2>End of Messages</h2>
            <p>When this appears, the tree moves up and disappears.</p>
          </div>
        </div>

        <div className="exit-sentinel"></div>
      </div>
    </section>
  );
};

export default StorySection;
