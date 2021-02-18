import React from 'react';
  
function hocWithFetch(WrappedComponent, requestUrl) {
    
  class WithFetch extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          data: []
        };
      }
      
      componentDidMount() {
        console.log(`no fetching in componentDidMount`);
      }
      
      fetchData = async (requestUrl) => {
        this.setState({
          data: []
        });
        
        try {
          const response = await fetch(requestUrl);
          
          if (response.ok) {
            const data = await response.json();
            //console.log('data:', data)
            this.setState({
              data
            });  
          } else {
            throw new Error('Fetch request error');
          }
          
        } catch (err) {
          // handle an error
        }
      };
      
      render() {
        return (
          <WrappedComponent 
            {...this.state}
            {...this.props} 
            getData={(requestUrl) => this.fetchData(requestUrl)}
            />
        )
      }
    }
    
    return WithFetch; 
  }
  
export default hocWithFetch;