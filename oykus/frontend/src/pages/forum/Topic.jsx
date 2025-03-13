export default function OkpTopic() {
  return (
    <section className="okp-topic">
      <header>
        <h1>Topic Title</h1>
        <p>Topic Description</p>
      </header>

      {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

      {/* Posts Section */}
      <section className="okp-topic-posts">
        <article className="okp-topic-post" id="post-1">
          <header>
            <p>
              <span className="sr-only">Post by </span>
              <strong><a href="#">Author</a></strong>
            </p>
            <p>
              <time dateTime="2021-01-01">January 1, 2021</time>
            </p>
          </header>
          <section aria-labelledby="post-1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </section>
        </article>
      </section>

      {/* TODO: Add a section for "Reply" and "New Topic" buttons, pagination, etc. */}

      {/* Permissions Section */}
      <section className="okp-permissions" aria-labelledby="permissions-heading">
        <h2 id="permissions-heading" className="sr-only">Permissions</h2>
        <p>You can reply to this topic.</p>
        <p>Editing is allowed for 15 minutes after posting.</p>
      </section>

      {/* Reply Form Section */}
      <section className="okp-reply" aria-labelledby="reply-heading">
        <h2 id="reply-heading">Write a Reply</h2>
        <form>
          <div>
            <label htmlFor="reply-content" className="sr-only">Your reply</label>
            <textarea id="reply-content" name="reply" rows="5"></textarea>
          </div>
          <button type="submit">Post Reply</button>
        </form>
      </section>

      <footer>
        <p>
          <a href="#">Back to Forum</a>
        </p>
      </footer>
    </section>
  );
}
