import "@/assets/styles/forum/topic.scss";
import { useState } from "react";
import { OkpForm, OkpSelect, OkpField, OkpActions, OkpSubmit, OkpReset } from "@/components/form";
import imgMC from "@/assets/img/mc.jpg";
import imgPachua from "@/assets/img/pachua.jpg";

export default function OkpTopic() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "mcpronovost",
        avatar: imgMC,
      },
      character: {
        name: "Pachu'a Wapi Qatlaalawsiq",
        avatar: imgPachua,
      },
      date: "January 1, 2021",
      message:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat rhoncus est nec scelerisque. Nullam ut cursus libero. Maecenas neque ante, ultricies eu libero vitae, ullamcorper facilisis metus. Sed a posuere odio, a luctus quam. Nam condimentum nisl id lacus gravida, id mollis dui eleifend. Curabitur rhoncus ornare consequat. In et nunc id risus tristique elementum.</p>",
    },
    {
      id: 2,
      author: {
        name: "Kamuy Sinen",
        avatar: imgPachua,
      },
      character: {
        name: "Seðom Øþornkilpič",
        avatar: imgMC,
      },
      date: "January 1, 2021",
      message:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat rhoncus est nec scelerisque. Nullam ut cursus libero. Maecenas neque ante, ultricies eu libero vitae, ullamcorper facilisis metus. Sed a posuere odio, a luctus quam. Nam condimentum nisl id lacus gravida, id mollis dui eleifend. Curabitur rhoncus ornare consequat. In et nunc id risus tristique elementum.</p>",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const message = formData.get("message");
    const authorName = formData.get("authorName");
    const authorAvatar = imgMC;
    const characterName = formData.get("characterName");
    const characterAvatar = imgPachua;
    const date = new Date().toISOString();

    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        author: {
          name: authorName,
          avatar: authorAvatar,
        },
        character: {
          name: characterName,
          avatar: characterAvatar,
        },
        date,
        message,
      },
    ]);
  };

  return (
    <section className="okp-topic">
      <header className="okp-topic-header">
        <h1 className="okp-topic-header-title">Topic Title</h1>
        <div className="okp-topic-header-description">
          <p>Topic Description</p>
        </div>
      </header>

      {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

      {/* Posts Section */}
      <section className="okp-topic-posts">
        {posts.map((post) => (
          <article
            key={post.id}
            className="okp-topic-post"
            id={`post-${post.id}`}
          >
            <header className="okp-topic-post-header">
              <div className="okp-topic-post-header-character">
                <figure
                  aria-hidden="true"
                  className="okp-topic-post-header-character-avatar"
                >
                  <img src={post.character.avatar} alt="mcpronovost" />
                </figure>
                <p className="okp-topic-post-header-character-name">
                  <span className="sr-only">Post from </span>
                  <strong>
                    <a href="#">{post.character.name}</a>
                  </strong>
                </p>
              </div>
              <div className="okp-topic-post-header-author">
                <span className="sr-only"> written </span>
                <strong>
                  by <a href="#">{post.author.name}</a>
                </strong>
                <span>
                  , <time dateTime="2021-01-01">{post.date}</time>
                </span>
              </div>
            </header>
            <section
              aria-labelledby="post-1"
              className="okp-topic-post-content"
            >
              <div className="okp-topic-post-content-message">
                <div dangerouslySetInnerHTML={{ __html: post.message }} />
              </div>
            </section>
            <footer className="okp-topic-post-footer"></footer>
          </article>
        ))}
      </section>

      {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

      {/* Permissions Section */}
      <section
        className="okp-permissions"
        aria-labelledby="permissions-heading"
      >
        <h2 id="permissions-heading" className="sr-only">
          Permissions
        </h2>
        <p>You can reply to this topic.</p>
        <p>Editing is allowed for 15 minutes after posting.</p>
      </section>

      {/* Reply Form Section */}
      <section className="okp-topic-reply" aria-labelledby="reply-heading">
        <header className="okp-topic-reply-header">
          <h2 className="okp-topic-reply-header-title" id="reply-heading">
            Répondre
          </h2>
          <div className="okp-topic-reply-header-description">
            <p>
              Vous pouvez répondre à ce sujet.
            </p>
          </div>
        </header>
        <div className="okp-topic-reply-card">
          <OkpForm onSubmit={handleSubmit}>
            <OkpField name="character" label="Character" errors={[{
              message: "Please select a character",
              match: "valueMissing",
            }]}>
              <OkpSelect name="character" placeholder="Select a character" required />
            </OkpField>
            <OkpField name="message" label="Message" errors={[{
              message: "Please enter a message",
              match: "valueMissing",
            }, {
              message: "Message must be at least 10 characters long",
              match: "tooShort",
            }]}>
              <textarea className="okp-form-textarea" required minLength={10} />
            </OkpField>
            <OkpActions>
              <OkpSubmit label="Envoyer" />
              <OkpReset label="Réinitialiser" />
            </OkpActions>
          </OkpForm>
        </div>
      </section>

      <footer>
        <p>
          <a href="#">Back to Forum</a>
        </p>
      </footer>
    </section>
  );
}
