import React from 'react'

const PostItem = ({ hasImage = true }) =>
  <section className="pb5">
    {
      hasImage &&
      <div className="nl3 nr3 nl4-m nr4-m nl5-l nr5-l">
        <img
          className="mb4 shadow-1 shadow-hover-2"
          src="http://localhost/minimal-react-wordpress/wp-content/uploads/2018/01/web-agency-29200.jpg"
          alt=""
        />
      </div>
    }

    <div className="ph3 ph4-ns">
      <a href="" className="color-hover-muted">
        <h2 className="pb3 pb2-ns f2">Lorem ipsum dolor sit amet, consectetur adipiscing!</h2>
      </a>

      <div className="pt1 pb2 f7 font-title color-muted tracked ttu">
        Updated Jan 21, 2018{
        }&ensp;<b>&middot;</b>&ensp;{
        }<a href="" className="color-muted color-hover-primary underline">Alpha</a>,&ensp;
        <a href="" className="color-muted color-hover-primary underline">Beta</a>,&ensp;
        <a href="" className="color-muted color-hover-primary underline">Gamma</a>
      </div>

      <div className="pt1 pb4">
        <p className="pb3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto neque facilis quisquam ratione fugiat ipsum corrupti doloribus sint sequi!
        </p>
        <p>
          Recusandae vitae in deserunt rem atque nihil deleniti sapiente maxime sint! Non voluptas eaque accusamus quod sit minus sapiente debitis tempore iste recusandae nihil expedita obcaecati saepe asperiores inventore, veniam distinctio eligendi cupiditate praesentium fugiat! Facere quae commodi suscipit voluptatem odio.
        </p>
      </div>

      <a href="" className="button-primary mb5">Read More</a>

      <div className="divider center w-third bg-color-muted"></div>
    </div>

    <style jsx>{`
      .divider { height: 2px; }
    `}</style>
  </section>

export default PostItem
