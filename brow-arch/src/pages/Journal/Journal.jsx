import { useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { blogPosts, blogCategories } from '../../data/blogPosts';
import styles from './Journal.module.css';

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <p className="section-label">Insights & Advice</p>
          <h1 className={styles.header__title}>Beauty Journal</h1>
          <p className={styles.header__sub}>
            Expert tips, treatment guides, and skincare advice — straight from the studio.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.filters}>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filter} ${activeCategory === cat ? styles['filter--active'] : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No posts in this category yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
