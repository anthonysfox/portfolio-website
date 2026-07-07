import Reveal from "@/components/Reveal";
import { FEATURED } from "@/config/featured";
import styles from "./page.module.css";
import { Repo } from "@/lib/github";

interface CodeSectionProps {
  repos: Repo[];
}

export default function CodeSection({ repos }: CodeSectionProps) {
  const byName = new Map(repos.map((r) => [r.name, r]));

  return (
    <section id="code" className={styles.codeSection}>
      <div className={styles.wrap}>
        <Reveal>
          <div className={`sec-head ${styles.codeSecHead}`}>
            <span className="eyebrow">Projects</span>
            <h2>Things I&apos;ve built.</h2>
            <p>
              A few personal projects — including the site you&apos;re looking
              at.
            </p>
          </div>
        </Reveal>

        <div className={styles.codeGrid}>
          {FEATURED.map((f, i) => {
            const live = byName.get(f.repo);
            const repoUrl =
              live?.html_url ?? `https://github.com/anthonysfox/${f.repo}`;
            const demoUrl = f.demo ?? live?.homepage;

            return (
              <Reveal
                key={f.repo}
                delay={i * 0.1}
                className={styles.codeReveal}
              >
                <div className="panel">
                  <div className="panel-bar">
                    <span className="lights">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={styles.panelRepoPath}>
                      ~/projects/{f.repo}
                    </span>
                  </div>
                  <div className="panel-body flex flex-col justify-between">
                    <div className="top">
                      <div className={styles.panelTitle}>{f.title}</div>
                      <p className={styles.panelBlurb}>{f.blurb}</p>
                    </div>
                    <div className="bottomm">
                      <div className={styles.panelTags}>
                        {f.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className={styles.panelLinks}>
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.panelLinkSource}
                        >
                          Source ↗
                        </a>
                        {demoUrl && (
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.panelLinkLive}
                          >
                            Live site ↗
                          </a>
                        )}
                      </div>

                      {live && (
                        <div className={styles.panelStats}>
                          {live.language && <span>{live.language}</span>}
                          <span>★ {live.stargazers_count}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
