using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Core.Services;
using Tigets.Core.Specifications;
using Xunit;
using System;

namespace Tigets.Tests.EventServiceTests
{
    public class EventServiceTests
    {
        private readonly Mock<IEventRepository> _eventRepositoryMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly Mock<IEventService> _eventServiceMock;

        public EventServiceTests()
        {
            _eventRepositoryMock = new Mock<IEventRepository>();
            _mapperMock = new Mock<IMapper>();
            _eventServiceMock = new Mock<IEventService>();
        }

        [Fact]
        public async void AddEvent_WhenEventIsNull_ShouldThrowArgumentNullException()
        {
            // Arrange
            var eventService = new EventService(_eventRepositoryMock.Object, _mapperMock.Object);

            // Act
            var exception = await Assert.ThrowsAsync<ArgumentNullException>(() => eventService.AddEvent(null));

            // Assert
            Assert.Equal("Value cannot be null. (Parameter 'newEvent')", exception.Message);
        }

        [Fact]
        public async void AddEvent_WhenEventNameIsEmpty_ShouldThrowArgumentException()
        {
            // Arrange
            var eventService = new EventService(_eventRepositoryMock.Object, _mapperMock.Object);
            var newEvent = new Event
            {
                Name = string.Empty,
                Description = "Description",
                Venue = "Venue",
                Date = DateTime.UtcNow.AddDays(1)
            };

            // Act
            var exception = await Assert.ThrowsAsync<ArgumentException>(() => eventService.AddEvent(newEvent));

            // Assert
            Assert.Equal("Event name cannot be null or empty.", exception.Message);
        }

        [Fact]
        public async void AddEvent_WhenEventDescriptionIsEmpty_ShouldThrowArgumentException()
        {
            // Arrange
            var eventService = new EventService(_eventRepositoryMock.Object, _mapperMock.Object);
            var newEvent = new Event
            {
                Name = "Name",
                Description = string.Empty,
                Venue = "Venue",
                Date = DateTime.UtcNow.AddDays(1)
            };

            // Act
            var exception = await Assert.ThrowsAsync<ArgumentException>(() => eventService.AddEvent(newEvent));

            // Assert
            Assert.Equal("Event description cannot be null or empty.", exception.Message);
        }

        [Fact]
        public async void AddEvent_WhenEventVenueIsEmpty_ShouldThrowArgumentException()
        {
            // Arrange
            var eventService = new EventService(_eventRepositoryMock.Object, _mapperMock.Object);
            var newEvent = new Event
            {
                Name = "Name",
                Description = "Description",
                Venue = string.Empty,
                Date = DateTime.UtcNow.AddDays(1)
            };

            // Act
            var exception = await Assert.ThrowsAsync<ArgumentException>(() => eventService.AddEvent(newEvent));

            // Assert
            Assert.Equal("Event venue cannot be null or empty.", exception.Message);
        }

        [Fact]
        public async void AddEvent_WhenEventDateIsInThePast_ShouldThrowArgumentException()
        {
            // Arrange
            var eventService = new EventService(_eventRepositoryMock.Object, _mapperMock.Object);
            var newEvent = new Event
            {
                Name = "Name",
                Description = "Description",
                Venue = "Venue",
                Date = DateTime.UtcNow.AddDays(-1)
            };

            // Act
            var exception = await Assert.ThrowsAsync<ArgumentException>(() => eventService.AddEvent(newEvent));

            // Assert
            Assert.Equal("Event date cannot be in the past.", exception.Message);
        }
    }
}