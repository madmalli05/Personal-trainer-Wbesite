import { useEffect, useRef, useState } from "react";
import { blog } from "../content";
import Reveal from "./Reveal";
import Img from "./Img";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Blog() {
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);
  const [active, setActive] = useState(null);

  // Open once the post content has rendered (avoids an empty-dialog flash).
  useEffect(() => {
    const dlg = dialogRef.current;
    if (active && dlg && !dlg.open) dlg.showModal();
  }, [active]);

  const openPost = (post, e) => {
    lastFocused.current = e.currentTarget;
    setActive(post);
  };
  const closePost = () => dialogRef.current?.close();
  const handleClose = () => {
    setActive(null);
    lastFocused.current?.focus?.(); // return focus to the trigger
  };
  const handleBackdrop = (e) => {
    if (e.target === dialogRef.current) closePost(); // click outside the article
  };

  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{blog.kicker}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ maxWidth: "22ch" }}>
              {blog.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{blog.subtitle}</p>
          </Reveal>
        </div>

        <div className="blog-grid">
          {blog.posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <article className="blog-card">
                <Img className="blog-thumb" src={post.image} alt={post.imageAlt} />
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readingTime && <span>· {post.readingTime}</span>}
                  </div>
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <button className="blog-readmore" onClick={(e) => openPost(post, e)}>
                    Read more →
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="blog-dialog"
        onClose={handleClose}
        onClick={handleBackdrop}
        aria-labelledby="blog-dialog-title"
      >
        {active && (
          <article className="blog-article">
            <button className="blog-dialog-close" onClick={closePost} aria-label="Close article">
              ✕
            </button>
            <Img className="blog-article-img" src={active.image} alt={active.imageAlt} />
            <div className="blog-meta">
              <time dateTime={active.date}>{formatDate(active.date)}</time>
              {active.readingTime && <span>· {active.readingTime}</span>}
            </div>
            <h3 id="blog-dialog-title">{active.title}</h3>
            {active.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
        )}
      </dialog>
    </section>
  );
}
