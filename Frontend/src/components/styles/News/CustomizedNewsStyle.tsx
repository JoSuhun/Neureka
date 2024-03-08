import styled from 'styled-components'

export const Wrapper = styled.div`
  /* background-color: beige; */
  width: 86%;
  height: 40vh;
  padding: 2% 7%;
  border-top: 1px solid var(--color-navy);
  border-bottom: 1px solid var(--color-navy);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-lightblue);
`
export const Title = styled.div`
  width: 100%;
  font-size: 1.5rem;
  color: var(--color-dark);
`
export const NewsBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const NewsList = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  cursor: pointer;
  &:hover .news-content {
    color: black;
  }
`

export const NewsThumbnail = styled.img<{ image: string }>`
  width: 30%;
  height: 90%;
  background: url(${props => props.image});
  background-size: cover;
`
export const NewsSection = styled.div`
  width: 100%;
  height: 90%;
`

export const NewsTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin: 1%;
  color: var(--color-dark);
`

export const NewsContent = styled.div`
  margin: 1%;
  color: var(--color-grey);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`
